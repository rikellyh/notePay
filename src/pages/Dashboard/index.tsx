import { Grid } from "@mui/material";

import Header from "../../components/Header";

import "../../styles/Dashboard.css";

const Dashboard = () => {
  const typeValueArray = ["Entrada", "Saída"];

  return (
    <>
      <Header />
      <section className="Container--Dashboard">
        <div className="InfoValues">
          <form>
            <Grid container>
              <Grid container item spacing={1}>
                <Grid item xs={12}>
                  <label htmlFor="description">Descrição</label>
                  <input type="text" placeholder="Digite aqui sua descrição" />
                </Grid>
              </Grid>
              <Grid container item spacing={1}>
                <Grid item xs={6}>
                  <label htmlFor="value">Valor</label>
                  <div id="InfoValues__Field--Value">
                    <input type="number" placeholder="1" />
                    <div>
                      <span>R$</span>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <label htmlFor="typeValue">Tipo de valor</label>
                  <select name="typeValue" id="typeValue">
                    <option value="">Selecione</option>
                    {typeValueArray.map((value, index) => (
                      <option value={index} key={index}>
                        {value}
                      </option>
                    ))}
                  </select>
                </Grid>
              </Grid>
            </Grid>
            <button type="submit">Inserir valor</button>
          </form>
          <div className="InfoValues--Box">
            <div>
              <h2>Valor total:</h2>
              <span>O valor se refere ao saldo</span>
            </div>
            <div>
              <p>R$1.000,00</p>
            </div>
          </div>
        </div>
        <main>aqui será a tabela</main>
      </section>
    </>
  );
};

export default Dashboard;
