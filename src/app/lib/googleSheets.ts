import { google } from "googleapis";

// Create a Google Sheets API client using the provided credentials.
export async function appendToGoogleSheet(orderData: any) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY!.replace(/\\n/g, "\n"), // Fix newlines in private key
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  const request = {
    spreadsheetId,
    range: "Sheet1!A1", // Update to match your sheet range
    valueInputOption: "RAW",
    resource: {
      values: [
        [
          orderData.name,
          orderData.email,
          orderData.phone,
          orderData.address,
          orderData.orderItems.map((item: any) => `${item.productName} (x${item.quantity})`).join(", "),
        ],
      ],
    },
  };

  try {
    const response = await sheets.spreadsheets.values.append(request);
    return response.data;
  } catch (error) {
    console.error("Error appending to Google Sheets:", error);
    throw new Error("Failed to add data to Google Sheets");
  }
}
