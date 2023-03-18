import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import numberWithCommas from "../utils/utils";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { API_URL } from "../config/API_URL";

export default function ModalKeranjang({ handleClose, showModal, keranjangDetail, jumlah, keterangan, handleMinus, handlePlus, handleChange, handleSubmit, totalHarga, handleDelete }) {
  if (keranjangDetail) {
    // console.log(getKeranjangsLength);
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {keranjangDetail.product.nama}
            <strong> (Rp. {numberWithCommas(keranjangDetail.product.harga)})</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <div className="mb-5">
              <h5>Total harga Rp. {numberWithCommas(totalHarga)}</h5>
            </div>
            <div className="mb-5">
              <span>Jumlah: </span>
              <Button onClick={handleMinus}>-</Button>
              <span> {jumlah} </span>
              <Button onClick={handlePlus}>+</Button>
            </div>
            <Form.Group className="mb-2">
              <Form.Label>Keterangan: </Form.Label>
              <Form.Control as="textarea" placeholder="Contoh: Pedas, nasi setengah" style={{ height: "100px" }} onChange={(e) => handleChange(e)} value={keterangan} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Simpan
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => handleDelete(keranjangDetail.id)}>
            Hapus Pesanan
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  // else {
  //   return (
  //     <Modal show={showModal} onHide={handleClose}>
  //       <Modal.Header closeButton>
  //         <Modal.Title>Modal heading</Modal.Title>
  //       </Modal.Header>
  //       <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
  //       <Modal.Footer>
  //         <Button variant="secondary" onClick={handleClose}>
  //           Close
  //         </Button>
  //         <Button variant="primary" onClick={handleClose}>
  //           Save Changes
  //         </Button>
  //       </Modal.Footer>
  //     </Modal>
  //   );
  // }
}
