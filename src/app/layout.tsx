import './global.css';
export const metadata = {
    title: "Frontend 01 Mock Dashboard JSX",
    description: "JSX mock dashboard for the AI store operations course"
  };
  
  //React.ReactNode react가표현할수있는 모든것
  export default function RootLayout({ children }: { children: React.ReactNode }){
    return (
      <html lang="ko">
        <body>{children}</body>
      </html>
    );
  }