import React, { Component, useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();

  //   const handleGoogleRegister = () => {
  //     const auth = getAuth();
  //     const provider = new GoogleAuthProvider();
  //     signInWithPopup(auth, provider)
  //       .then((result) => {
  //         console.log(result.user);
  //         localStorage.setItem("user", JSON.stringify(result.user));
  //         navigate("/dashboard");
  //       })
  //       .catch((err) => {
  //         console.info(err);
  //       });
  //   };

  const handleEmailPasswordRegister = (e) => {
    e.preventDefault();
    if (!email || !password || !password2) {
      return alert("silahkan lengkapi semua data");
    }
    if (password !== password2) {
      return alert("password harus sama");
    }
    if (password.length < 6) {
      return alert("password harus lebih dari enam karakter");
    }
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
        swal({
          title: "Registerasi Berhasil",
          text: `Selamat! Anda Berhasil Registrasi`,
          icon: "success",
          button: false,
          timer: 2000,
        });
        localStorage.setItem("user", JSON.stringify(result.user));
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        if (err) {
          const errorMessage = err.message.replace("Firebase: ", "");
          alert(errorMessage);
        }
      });
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)" }}>
      <div className="col-md-4 col-8 d-flex flex-column   justify-content-center align-items-center text-center py-5" style={{ backgroundColor: "#022233", borderRadius: "20px", padding: "0px" }}>
        <h3 className="text-white">Form Registrasi</h3>
        <div className="col-md-8 col-8 mt-5">
          <input className="input w-100 text-white" id="email" name="email" placeholder="Email" type="text" onChange={(e) => setEmail(e.target.value)} style={{ backgroundColor: "#022233" }} />
          <br />
          <input className="input w-100 mt-2 text-white" id="password" name="password" placeholder="Password" type="Password" onChange={(e) => setPassword(e.target.value)} style={{ backgroundColor: "#022233" }} />
          <br />
          <input className="input w-100 mt-2 text-white" id="password2" name="password2" placeholder="Konfirmasi Password" type="Password" onChange={(e) => setPassword2(e.target.value)} style={{ backgroundColor: "#022233" }} />
          <br />
          <a className="btn btn-primary mt-5 w-100" onClick={handleEmailPasswordRegister}>
            Register
          </a>
          <p className="text-white mt-2">
            Anda sudah registrasi?{" "}
            <Link to="/login" className="text-decoration-none">
              {" "}
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
