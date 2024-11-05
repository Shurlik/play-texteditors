"use client"
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

import { Box, Button, Typography } from "@mui/material";
import { LogoXLIcon } from "@/components/common/Icons";
import { useAuth } from "@/contexts/AuthContext";
import { getColor } from "@/utils/getColor";
import DialogLogin from "@/components/common/DialogLogin";
import LoginIcon from "@mui/icons-material/Login";

const colors = {
  mainGreen: getColor("mainGreen"),
  white: getColor("white"),
  backgroundMain: getColor("backgroundMain"),
};

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);
  const textRef = useRef<HTMLButtonElement | null>(null);
  const textRef2 = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const textUnderRef = useRef<HTMLDivElement | null>(null);

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleSubmit = async (username: string, password: string) => {
    try {
      await login(username, password);
      router.push("/");
    } catch (err) {
      console.log({ err });
    }
  };

  const openLogin = () => setShowLogin(true);
  const hideLogin = () => setShowLogin(false);

  useEffect(() => {
    const timeline = gsap.timeline();
    gsap.registerPlugin(TextPlugin);

    // Text animation
    timeline
      .fromTo(
        textRef2.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: "power2.in",
        }
      )
      .fromTo(
        titleRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: "power2.in",
        },
        ">-1"
      )
      .fromTo(
        "#texttest",
        {},
        {
          duration: 1,
          text: "SUPREME AI MARKETING",
          ease: "none",
          delimiter: "1",
        }
      )
      .fromTo(
        textRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.in",
        },
        ">-1.5"
      );
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: colors.backgroundMain,
        height: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        padding: "10rem",
      }}
    >
      <DialogLogin
        isOpen={showLogin}
        onClose={hideLogin}
        onSubmit={handleSubmit}
      />
      <Typography
        ref={textRef2}
        variant="h2"
        sx={{ color: colors.white, fontSize: "6rem" }}
      >
        Welcome to
      </Typography>
      <LogoXLIcon />
      <Typography
        id="texttest"
        ref={textUnderRef}
        variant="body1"
        sx={{
          height: "2rem",
          fontWeight: "normal",
          fontSize: "1rem",
          letterSpacing: 5,
          color: colors.mainGreen,
          marginBottom: "3rem",
          marginTop: "-1rem",
        }}
      />
      <Box sx={{ textAlign: "center" }}>
        <Button
          ref={textRef}
          onClick={openLogin}
          variant="contained"
          endIcon={<LoginIcon />}
          color="primary"
          sx={{
            width: "8rem",
          }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
