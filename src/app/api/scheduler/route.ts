import { NextResponse } from 'next/server';
import cron from 'node-cron';

export async function POST() {
  try {
    cron.schedule('*/10 * * * * *', async () => {
      console.log(`Running scheduler task a 10 second`);
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: error });
  }
}
