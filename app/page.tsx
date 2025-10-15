import Image from "next/image";


export default function Home() {
  return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <button style={{padding: '10px 8px',backgroundColor: 'skyblue', marginTop: '20%'}}><a href="/doctors">Doctors!</a></button>
      </div>
  );
}
