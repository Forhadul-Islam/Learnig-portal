import React from "react";
import Position from "../../components/leaderboard/Position";
import TopResults from "../../components/leaderboard/TopResults";
import Navbar from "../../components/navbar/Navbar";

const LeaderBoard = () => {
  return (
    <>
      <Navbar />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <Position />

          <TopResults />
        </div>
      </section>
    </>
  );
};

export default LeaderBoard;
