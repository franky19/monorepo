import {NextResponse} from 'next/server';

export async function POST() {
  try {
    return NextResponse.json({status: 200, message: 'OK'});
  } catch (error) {
    return NextResponse.json({status: 500, message: 'SERVER ERROR'});
  }
}
