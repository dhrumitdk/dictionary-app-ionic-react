import { IonButton, IonIcon, IonInput, IonItem, IonLabel } from "@ionic/react";
import "./ExploreContainer.css";
import { search } from "ionicons/icons";
import { useState } from "react";
import axios from "axios";

interface ContainerProps {}

const ExploreContainer: React.FC<ContainerProps> = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const wordInfo = document.getElementById("word-info");
  const handleSubmit = (e: any) => {
    e.preventDefault(); // Prevents page from refresh
    axios
      .get(`https://api.api-ninjas.com/v1/dictionary?word=${searchTerm}`, {
        headers: { "X-Api-Key": process.env.REACT_APP_PASSWORD },
      })
      .then((response) => setSearchResult(response.data.definition))
      .catch((error) => {
        throw error;
      });
    wordInfo!.style.display = "block";
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <IonItem>
          <IonLabel position="floating">Search a word...</IonLabel>
          <IonInput
            value={searchTerm}
            onIonInput={(e: any) => setSearchTerm(e.target.value)}
            required
            placeholder="Example: Cake"
          ></IonInput>
        </IonItem>
        <br />
        <IonButton color="tertiary" type="submit">
          <IonIcon slot="start" icon={search}></IonIcon>
          Search
        </IonButton>
      </form>
      <div id="word-info" style={{ display: "none" }}>
        <h3>{searchTerm}:</h3>
        <p>{searchResult}</p>
      </div>
    </div>
  );
};

export default ExploreContainer;
