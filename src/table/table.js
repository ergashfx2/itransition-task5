import { useEffect, useState } from "react";

function Table({ selectedNat, errorsNumber }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const newData = await generateRandomData(selectedNat, errorsNumber);
        setData(newData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDataFromApi();
  }, [selectedNat, errorsNumber]);
  const generateRandomData = async (selectedNat, errorsNumber) => {
    try {
      const response = await fetch(`https://randomuser.me/api/?nat=${selectedNat}&results=10`);
      const jsonData = await response.json();
      const modifiedData = { ...jsonData };
      if (modifiedData.results) {
        modifiedData.results = modifiedData.results.map((result) => {
          result.name.title = generateMisspelledWord(result.name.title, errorsNumber);
          result.name.first = generateMisspelledWord(result.name.first, errorsNumber);
          result.name.last = generateMisspelledWord(result.name.last, errorsNumber);
          result.location.street.number = generateMisspelledWord(String(result.location.street.number), errorsNumber);
          result.location.street.name = generateMisspelledWord(result.location.street.name, errorsNumber);
          result.location.city = generateMisspelledWord(result.location.city, errorsNumber);
          result.location.state = generateMisspelledWord(result.location.state, errorsNumber);
          result.location.country = generateMisspelledWord(result.location.country, errorsNumber);
          result.phone = generateRandomPhoneNumber();
          return result;
        });
      }
      return modifiedData;
    } catch (error) {
      throw new Error("Error fetching data from API");
    }
  };
  const generateMisspelledWord = (word, errorsNumber) => {
    const wordArray = word.split('');
    for (let i = 0; i < errorsNumber; i++) {
      const index = Math.floor(Math.random() * wordArray.length);
      wordArray[index] = generateRandomCharacter();
    }
    return wordArray.join('');
  };
  const generateRandomCharacter = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return characters.charAt(Math.floor(Math.random() * characters.length));
  };
  const generateRandomPhoneNumber = () => {
    const phoneNumber = Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
    return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  };

  if (loading) return <div>Loading...</div>;
  else if (error) return <div>{error.message}</div>;

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Identifier</th>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">Phone</th>
          </tr>
        </thead>
        <tbody>
          {data.results.map((result, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{result.login.uuid}</td>
              <td>{`${result.name.title} ${result.name.first} ${result.name.last}`}</td>
              <td>{`${result.location.street.number} ${result.location.street.name}, ${result.location.city}, ${result.location.state}, ${result.location.country}`}</td>
              <td>{result.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
