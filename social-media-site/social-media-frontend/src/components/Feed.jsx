import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const Feed = () => {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    let query = null;

    if (categoryId) {
      query = searchQuery(categoryId);
    } else {
      query = feedQuery;
    }

    client.fetch(query).then((data) => {
      setPins(data);
    //   console.log("pins:", data);
      setLoading(false);
    });
  }, [categoryId]);

  const ideaName = categoryId || "new";

  if (loading) {
    return (
      <Spinner message={`We are adding ${ideaName} ideas to your feed!`} />
    );
  }
//   return <div className="ark">{pins && (<MasonryLayout pins={pins} />)}</div>;
// return <div><h1>HELLO FROM FEED</h1></div>
return (
    <div className="ark">
      {pins && (
        <MasonryLayout pins={pins} />
      )}
    </div>
  );
};

export default Feed;
