import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import axios from "axios";
import "./pokemon.scss";

const Pokemon = () => {
  const [input, setInput] = useState("");
  const [debouncedValue] = useDebounce(input, 500);
  const [data, setData] = useState(null);
  const [errorMsg, setErrorMsg] = useState();

  const getData = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${input}`
      );

      setData(response?.data);
      setErrorMsg(false);
    } catch (err) {
      setData(null);
      if (err?.response?.status === 404) {
        setErrorMsg("Pokemon with the following name does not exist");
      }
      console.log(errorMsg);
    }
  };

  useEffect(() => {
    getData();
  }, [debouncedValue]);

  const handleInputChange = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setInput(value);
    console.log(input);
  };

  return (
    <div className="main-container">
      <div className="input-container">
        <h2>Pokemon</h2>
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Search"
        ></input>
      </div>
      <div>
        {data?.name && (
          <div className="card">
            {data?.sprites?.front_default && (
              <img
                src={data?.sprites?.front_default}
                alt="pokemon-img"
                height="200px"
                width="200px"
              ></img>
            )}
            <h2>{data?.name.toUpperCase()}</h2>
            <div className="abilities">
              abilities :
              {data?.abilities?.map((ability) => {
                return (
                  <span className="abilities" key={ability}>
                    {ability.ability.name}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
      {input.length > 0 && errorMsg && <div className="errMsg">{errorMsg}</div>}
    </div>
  );
};

export default Pokemon;
