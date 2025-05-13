import React, { useState, useRef } from 'react';
import { User, Upload, Loader2, Check, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import type { RegistrationFormData, PasswordStrength } from '../lib/types';

export default function RegistrationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<RegistrationFormData>({
    email: '',
    password: '',
    full_name: '',
  });
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    hasMinLength: false,
    hasNumber: false,
    hasSpecialChar: false,
  });
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const checkPasswordStrength = (password: string) => {
    const strength: PasswordStrength = {
      score: 0,
      hasMinLength: password.length >= 8,
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    strength.score = [
      strength.hasMinLength,
      strength.hasNumber,
      strength.hasSpecialChar,
    ].filter(Boolean).length;

    setPasswordStrength(strength);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size must be less than 2MB');
      return;
    }

    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      toast.error('Only JPG and PNG files are allowed');
      return;
    }

    setFormData(prev => ({ ...prev, avatar: file }));
    const reader = new FileReader();
    reader.onloadend = () => setAvatarPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate form data
      if (!formData.email || !formData.password || !formData.full_name) {
        throw new Error('Please fill in all required fields');
      }

      if (passwordStrength.score < 2) {
        throw new Error('Please choose a stronger password');
      }

      // Sign up user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('Registration failed');

      // Upload avatar if provided
      let avatarUrl = null;
      if (formData.avatar) {
        const fileExt = formData.avatar.name.split('.').pop();
        const filePath = `${authData.user.id}/avatar.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, formData.avatar);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(filePath);

        avatarUrl = publicUrl;
      }

      // Create profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{
          id: authData.user.id,
          full_name: formData.full_name,
          avatar_url: avatarUrl,
        }]);

      if (profileError) throw profileError;

      toast.success('Registration successful! Please check your email to verify your account.');
      
      // Reset form
      setFormData({ email: '', password: '', full_name: '' });
      setAvatarPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-tech-gray p-8 rounded-2xl card-glow">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-display font-bold text-glow">Create Account</h2>
          <p className="text-gray-400 mt-2">Join our gaming community</p>
        </div>

        {/* Avatar Upload */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-tech-dark border-2 border-gray-700 flex items-center justify-center">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
              ) : (
                <User className="w-12 h-12 text-gray-500" />
              )}
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full hover:bg-blue-600 transition-colors"
            >
              <Upload className="w-4 h-4" />
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleFileChange}
            className="hidden"
          />
          <p className="text-sm text-gray-400 mt-2">Upload profile picture (optional)</p>
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-gray-300 mb-2" htmlFor="full_name">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="full_name"
            name="full_name"
            type="text"
            value={formData.full_name}
            onChange={handleChange}
            className="w-full bg-tech-dark border border-gray-700 rounded-lg p-3 text-gray-100"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-300 mb-2" htmlFor="email">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-tech-dark border border-gray-700 rounded-lg p-3 text-gray-100"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-300 mb-2" htmlFor="password">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-tech-dark border border-gray-700 rounded-lg p-3 text-gray-100"
            required
          />
          
          {/* Password Strength Indicator */}
          <div className="mt-3 space-y-2">
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded-full ${
                    i < passwordStrength.score
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                      : 'bg-gray-700'
                  }`}
                />
              ))}
            </div>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center gap-2">
                {passwordStrength.hasMinLength ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <X className="w-4 h-4 text-gray-500" />
                )}
                <span className="text-gray-400">At least 8 characters</span>
              </li>
              <li className="flex items-center gap-2">
                {passwordStrength.hasNumber ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <X className="w-4 h-4 text-gray-500" />
                )}
                <span className="text-gray-400">Contains a number</span>
              </li>
              <li className="flex items-center gap-2">
                {passwordStrength.hasSpecialChar ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <X className="w-4 h-4 text-gray-500" />
                )}
                <span className="text-gray-400">Contains a special character</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || passwordStrength.score < 2}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-display font-semibold py-4 px-8 rounded-lg text-lg transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Creating Account...
            </>
          ) : (
            'Create Account'
          )}
        </button>
      </form>
    </div>
  );
}