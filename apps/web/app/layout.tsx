import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata = { title:'UniAdmissionPrep', description:'Structured private-university admission preparation' };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }
