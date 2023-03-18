import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config/API_URL.js";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import numberWithCommas from "../utils/utils";
import swal from "sweetalert";

function Sukses() {
  const [pesanans, setPesanans] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getPesanans = () => {
    axios
      .get(API_URL + "pesanans")
      .then((res) => {
        setPesanans(res.data);
        console.log("pesanan", pesanans);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPesanans();
  }, []);

  const handleDelete = () => {
    const confirm = window.confirm("apakah anda yakin ingin menghapus semua pesanan anda?");
    if (confirm) {
      pesanans.map((pesanan) => {
        axios
          .delete(API_URL + "pesanans/" + pesanan.id)
          .then((res) => {
            swal({
              title: "Kosongkan Pesanan!",
              text: `Kosongkan Pesanans Berhasil`,
              icon: "success",
              button: false,
              timer: 1000,
            });
            getPesanans();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  };

  // console.log(pesanans);
  console.log(pesanans.length);
  if (pesanans.length === 0) {
    return (
      <div class="d-flex justify-content-center align-items-center text-center" style={{ height: "100vh" }}>
        <h5>
          <strong>Pesanan Anda Masih Kosong. silahkan buat pesanan terlebih dahulu!</strong>
        </h5>
      </div>
    );
  }
  return (
    <div className="mt-4 text-center">
      <img src="assets/icons/sukses.png" width="250px" />
      <h2>Pesanan Sukses</h2>
      <p>Pesanan anda sedang kami siapkan!</p>
      <Button variant="primary" onClick={handleShow}>
        Detail Pesanan anda <i class="fa-solid fa-chevron-down"></i>
      </Button>
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Details Pesanan Anda</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table className="table table-striped table-bordered mt-3">
              <thead className="text-center">
                <tr>
                  <th>NO</th>
                  <th>Product</th>
                  <th>Harga/biji</th>
                  <th>Jumlah</th>
                  <th>Total Harga</th>
                  {/* <th colspan="3">AKSI</th> */}
                </tr>
              </thead>
              <tbody>
                {pesanans.map((pesanan, index) => {
                  const menus = pesanan.menus;
                  const totalRow = (
                    <tr>
                      <td colSpan={4} className="text-center">
                        <b>Total </b>
                      </td>
                      <td>{numberWithCommas(pesanan.totalHarga)}</td>
                    </tr>
                  );
                  return (
                    <React.Fragment key={index}>
                      {menus.map((menu, i) => {
                        return (
                          <tr key={`${index}-${i}`}>
                            <td>{i + 1}</td>
                            <td>{menu.product.nama}</td>
                            <td>{numberWithCommas(menu.product.harga)}</td>
                            <td>{menu.jumlah}</td>
                            <td>{numberWithCommas(menu.totalHarga)}</td>
                          </tr>
                        );
                      })}
                      {totalRow}
                    </React.Fragment>
                  );
                })}

                {/* <div>
                  <button className="btn btn-danger">Kosongkan Pesanan</button>
                </div> */}
              </tbody>
            </table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleDelete}>
              kosongkan Pesanans
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Sukses;
