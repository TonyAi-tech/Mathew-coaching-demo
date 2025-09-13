interface BookingData {
  name: string;
  email: string;
  phone: string;
  sessionDate?: string;
  sessionTime?: string;
  serviceType?: string;
  specialRequests?: string;
}

interface AirtableRecord {
  fields: {
    Name: string;
    Email: string;
    Phone: string;
    'Session Date'?: string;
    'Session Time'?: string;
    'Service Type'?: string;
    'Special Requests'?: string;
    'Booking Status': string;
    'Created At': string;
  };
}

const AIRTABLE_BASE_ID = 'appomlTGiGnNYGsAp';
const AIRTABLE_TABLE_NAME = 'tblYourTableId'; // You need to replace this with your actual table ID
const AIRTABLE_API_KEY = 'patltMn5X6aE8FsMk.b361610f088219a58e23fbeb3c085c2702c09cca505af1ca5a858d9103193b68';

export const submitBookingToAirtable = async (bookingData: BookingData): Promise<any> => {
  // Try using the table name first, then fall back to table ID if needed
  const tableName = 'Airtable Data';
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(tableName)}`;
  
  const record: AirtableRecord = {
    fields: {
      'Name': bookingData.name,
      'Email': bookingData.email,
      'Phone': bookingData.phone,
      'Booking Status': 'pending',
      'Created At': new Date().toISOString()
    }
  };

  // Add optional fields if they exist
  if (bookingData.sessionDate) {
    record.fields['Session Date'] = bookingData.sessionDate;
  }
  if (bookingData.sessionTime) {
    record.fields['Session Time'] = bookingData.sessionTime;
  }
  if (bookingData.serviceType) {
    record.fields['Service Type'] = bookingData.serviceType;
  }
  if (bookingData.specialRequests) {
    record.fields['Special Requests'] = bookingData.specialRequests;
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        records: [record]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Airtable API Error Details:', errorData);
      throw new Error(`Airtable API error: ${response.status} - ${errorData.error?.message || errorData.error?.type || 'Unknown error'}`);
    }

    const data = await response.json();
    return data.records[0]; // Return the first record from the response
  } catch (error) {
    console.error('Error submitting to Airtable:', error);
    throw error;
  }
};