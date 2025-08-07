import validObjectIDList from '@/public/data/validObjectIDList.json'
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Error from "next/error";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ArtworkCard from "@/components/ArtworkCard";
import { Pagination } from "react-bootstrap";
const PER_PAGE = 12;

export default function ArtWork() {
  const router = useRouter();
  const finalQuery = router.asPath.split("?")[1];

  const [artworkList, setArtworkList] = useState();
  const [page, setPage] = useState(1);

  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`
  );

  function previousPage() {
    if (page > 1) setPage((prevPage) => prevPage - 1);
  }

  function nextPage() {
    if (page < artworkList.length) setPage((prevPage) => prevPage + 1);
  }

  useEffect(() => {
  if (!data || !data.objectIDs) {
    setArtworkList([]); // no results or data not ready
    return;
  }

  let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs.includes(x));

  if (filteredResults.length > 0) {
    const results = [];
    for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
      const chunk = filteredResults.slice(i, i + PER_PAGE);
      results.push(chunk);
    }
    setArtworkList(results);
    setPage(1);
  } else {
    setArtworkList([]); 
  }
}, [data]);


  if (error) return <Error statusCode={404} />;

  return (
    <>
      {artworkList ? (
        <>
          <Row className="gy-4">
            {artworkList.length > 0 ? (
              artworkList[page - 1].map((objectID) => (
                <Col lg={3} key={objectID}>
                    <ArtworkCard objectID={objectID} />
                </Col>
            ))
            ) : (
              <h4>Nothing Here</h4>
            )}
          </Row>
          <br/>
          <Pagination>
            <Pagination.Prev onClick={previousPage} disabled={page === 1} />
            <Pagination.Item>{page}</Pagination.Item>
            <Pagination.Next onClick={nextPage} />
          </Pagination>
        </>
      ) : null}
    </>
  );
}
