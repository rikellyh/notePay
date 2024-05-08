import { Link } from "react-router-dom";

import { usePageTransition } from "../../hooks/useTransitionPage";

import BgPerson from "../../assets/person.jpg";
import "../../styles/Home.css";

const Home = () => {
  const { fadeOut } = usePageTransition();

  return (
    <>
      <section className={`InitialScreen ${fadeOut ? "fade-out" : "fade-in"}`}>
        <img
          src={BgPerson}
          alt="Ilustração de uma mulher administrando suas finanças"
        />
        <h1>Domine suas Finanças e Mantenha o Controle do seu Dinheiro:</h1>
        <span>
          Adicione seu saldo disponível em <strong>entradas</strong> e suas
          despesas em <strong>saídas</strong> de maneira fácil e rápida.
        </span>
        <Link to={"/dashboard"}>Iniciar</Link>
      </section>
    </>
  );
};

export default Home;
