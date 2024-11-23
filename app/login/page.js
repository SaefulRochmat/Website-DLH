import LoginForm from "../components/LoginForm";

export async function generateMetadata() {
  return {
    title: 'Login',
    description: 'Halaman Login.',
  };
}

export default function HalamanLogin () {
  return (
    <>
      <LoginForm/>
    </>
  );
}