import { google } from 'googleapis';
import { NextResponse } from 'next/server';

const sheets = google.sheets('v4');

// Google Sheets function
const appendToGoogleSheet = async (formData: any) => {
  try {
    // Clean and format the private key
    const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY
      ? process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n')
      : '';

    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: 'service_account',
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const authClient = await auth.getClient();

    const request = {
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:I', // Updated range to match the sheet structure
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [
          [
            new Date().toISOString(), // Timestamp
            formData.firstName,
            formData.lastName,
            formData.email,
            formData.phoneNumber,
            formData.address,
            formData.color,
            formData.quantity,
          ],
        ],
      },
      auth: authClient,
    };

    const response = await sheets.spreadsheets.values.append(request as any);
    console.log('Google Sheets response:', response.data);
  } catch (error) {
    console.error('Google Sheets error:', error);
    throw new Error('Failed to append to Google Sheets');
  }
};

// New App Router handler
export async function POST(request: Request) {
  try {
    const formData = await request.json();

    // Validate required environment variables
    if (!process.env.GOOGLE_SHEETS_PRIVATE_KEY || !process.env.GOOGLE_SHEETS_CLIENT_EMAIL) {
      throw new Error('Missing required Google Sheets credentials');
    }

    // Append to Google Sheets
    await appendToGoogleSheet(formData);

    return NextResponse.json({ message: 'Order submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error processing order:', error);
    return NextResponse.json(
      {
        message: 'Failed to submit order',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
