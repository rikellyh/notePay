interface BoxInfoValuesProps {
  sum: string;
}

export const BoxInfoValues = ({ sum }: BoxInfoValuesProps) => {
  return (
    <div className="InfoValues--Box">
      <div>
        <h2>Valor total:</h2>
        <span>O valor se refere ao saldo</span>
      </div>
      <div>
        <p>{sum}</p>
      </div>
    </div>
  );
};
