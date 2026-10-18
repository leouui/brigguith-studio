import {
  Hero,
  QuienSoy,
  Disenos,
  Videos,
  Cursos,
  Servicios,
  Contacto,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Hero />
      <QuienSoy />
      <Cursos />
      <Servicios />
      <Disenos />
      <Videos />
      <Contacto />
    </>
  );
}