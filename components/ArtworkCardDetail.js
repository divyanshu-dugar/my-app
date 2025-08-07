// components/ArtworkCardDetail.js
import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { favouritesAtom } from '../store';
import useSWR from 'swr';
import { Card, Button } from 'react-bootstrap';
import Error from 'next/error';
import {addToFavourites, removeFromFavourites} from '@/lib/userData'

export default function ArtworkCardDetail({ objectID }) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  useEffect(()=>{
      setShowAdded(favouritesList?.includes(objectID))
  }, [favouritesList, objectID])


  const favouritesClicked = async () => {
    if (showAdded) {
      // setFavouritesList(current => current.filter(fav => fav !== objectID));
      setFavouritesList(await removeFromFavourites(objectID));
    } else {
      // setFavouritesList(current => [...current, objectID]);
      setFavouritesList(await addToFavourites(objectID))
    }
  };

  const { data, error } = useSWR(
    objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null
  );

  if (error) return <Error statusCode={404} />;
  if (!data) return <div>Loading...</div>;

  return (
    <Card>
      <Card.Img variant="top" src={data.primaryImage || data.primaryImageSmall || 'https://via.placeholder.com/375x375.png?text=No+Image'} />
      <Card.Body>
        <Card.Title>{data.title || 'N/A'}</Card.Title>
        <Card.Text>
          <strong>Date:</strong> {data.objectDate || 'N/A'} <br />
          <strong>Classification:</strong> {data.classification || 'N/A'} <br />
          <strong>Medium:</strong> {data.medium || 'N/A'} <br /> <br />
          <strong>Artist:</strong> {data.artistDisplayName || 'N/A'} {'( '} <a href={data.artistWikidata_URL}>wiki</a> {' )'} <br/>
          <strong>Credit Line:</strong> {data.creditLine || 'N/A'} <br />
          <strong>Dimensions:</strong> {data.dimensions || 'N/A'} <br />
        </Card.Text>
    
        <Button
          variant={showAdded ? 'primary' : 'outline-primary'}
          onClick={favouritesClicked}
        >
          {showAdded ? 'Favourite (added)' : '+ Favourite'}
        </Button>
      </Card.Body>
    </Card>
  );
}