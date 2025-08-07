// pages/favourites.js
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import ArtworkCard from "@/components/ArtworkCard";
import { Row, Col, Container } from "react-bootstrap";

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);
  if(!favouritesList) return null;

  return (
    <Container>
      <h1 className="my-4">Favourites</h1>

      {favouritesList.length === 0 ? (
        <p>Nothing Here. Try adding some new artwork to the list.</p>
      ) : (
        <Row className="gy-4">
          {favouritesList.map((objectID) => (
            <Col key={objectID} xs={12} sm={6} md={4} lg={3}>
              <ArtworkCard objectID={objectID} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}