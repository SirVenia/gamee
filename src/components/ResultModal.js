import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function ResultModal({ fetchLeaderboard, show, handleClose, header, body }) {
  const [name, setName] = useState(null);
  const [leaderboard, setLeaderboard] = useState(null);

  useEffect(() => {
    if (show) {
      fetchLeaderboard().then(setLeaderboard);
    }
  }, [show]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{body}</p>
        {!leaderboard && <p>Lalalaloading Leleleleaderboard</p>}
        {leaderboard && leaderboard.map((entry, i) => <p key={i}>{entry}</p>)}
        <Form.Control
          type="text"
          placeholder="What's your name, Babe?"
          onChange={(event) => setName(event.target.value)}
        ></Form.Control>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleClose}>
          Ba ba
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save your lowscore for the afterworld
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ResultModal;
