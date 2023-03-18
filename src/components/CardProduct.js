import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Col } from "react-bootstrap";
import numberWithCommas from "../utils/utils";

export default function CardProduct({ menu, masukKeranjang }) {
  return (
    <Col className="col-md-4">
      <Card
        // style={{ width: "14rem" }}
        className="mt-2 shadow"
        onClick={() => {
          masukKeranjang(menu);
        }}
      >
        <Card.Img variant="top" src={"assets/images/" + menu.category.nama.toLowerCase() + "/" + menu.gambar} />
        <Card.Body>
          <Card.Title>
            {menu.nama} ({menu.kode})
          </Card.Title>
          <Card.Text>Rp {numberWithCommas(menu.harga)}.</Card.Text>
          <Button variant="primary" className="px-5">
            Beli
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}
