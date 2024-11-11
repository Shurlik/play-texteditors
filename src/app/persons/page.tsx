"use client";
import {Box, Button, IconButton, Snackbar, TextField, Typography,} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import {toast} from "react-toastify";
import useSWR from "swr";

import {askClaudeStream} from "@/api/services/claudeService";
import {askGptStream} from "@/api/services/chatGptService";
import {getAllRecords} from "@/api/services/airtableService";
import {getColor} from "@/utils/getColor";
import AssistantSelector from "@/components/services/AssistantSelector";
import authService from "@/api/services/authService";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import FormattedTextDisplay from "@/components/services/FormattedTextDisplay";
import Loader from "@/components/common/Loader";
import PersonCard from "@/components/common/PersonCard";
import Editor from "@/components/tests/TestEditor";

interface Person {
  id: string;
  name: string;
  // Add other fields as needed
}

const colors = {
  white: getColor("white"),
  whitePermanet: getColor("whitePermanent"),
  orange: getColor("orange"),
  orange50: getColor("orange50"),
  mainGreen: getColor("mainGreen"),
};

const Persons: React.FC = () => {
  // @ts-ignore
  const {data = [], isLoading} = useSWR<Person[]>("/persons", getAllRecords);
  const [selectedPersons, setSelectedPersons] = useState<{
    [key: string]: boolean;
  }>({});
  const [requestText, setRequestText] = useState("");
  const [resultText, setResultText] = useState("");
  const [loading, setLoading] = useState(false);
  const [assistant, setAssistant] = useState<"gpt" | "claude">("gpt");
  const resultBoxRef = useRef<HTMLDivElement>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAssistant(event.target.value as "gpt" | "claude");
  };

  const handleSelectChange = (personId: string, isSelected: boolean) => {
    setSelectedPersons((prev) => ({...prev, [personId]: isSelected}));
  };

  const handleRequestChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRequestText(event.target.value);
  };

  // const handleSendRequest = async () => {
  //   setLoading(true);
  //   const selectedIds = Object.entries(selectedPersons)
  //     .filter(([_, isSelected]) => isSelected)
  //     .map(([id]) => id);

  //   try {
  //     const res =
  //       assistant === "gpt"
  //         ? await askGpt(requestText, selectedIds)
  //         : await askClaude(requestText, selectedIds);
  //     if (typeof res !== "string") {
  //       toast.error("Invalid output!");
  //       console.error("Output:", res);
  //       return;
  //     }
  //     setResultText(res);
  //     setRequestText("");
  //     setSelectedPersons({});
  //   } catch (error) {
  //     console.error("Error:", error);
  //     toast.error("Something went wrong");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const streamAnswer = async () => {
    setLoading(true);
    const selectedIds = Object.entries(selectedPersons)
      .filter(([_, isSelected]) => isSelected)
      .map(([id]) => id);

    try {
      setResultText("");
      if (assistant === "gpt") {
        await askGptStream(requestText, selectedIds, (chunk) => {
          setResultText((prev) => prev + chunk);
        });
      } else {
        await askClaudeStream(requestText, selectedIds, (chunk) => {
          setResultText((prev) => prev + chunk);
        });
      }
      setRequestText("");
      setSelectedPersons({});
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error fetching streams:", error);
      if (error.message === "Unauthorized") {
        await authService.logout();
      }
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(resultText);
      setSnackbarOpen(true);
    } catch (err) {
      console.error("Failed to copy text:", err);
      toast.error("Failed to copy text");
    }
  };

  useEffect(() => {
    if (resultBoxRef.current) {
      resultBoxRef.current.scrollTop = resultBoxRef.current.scrollHeight;
    }
  }, [resultText]);

  if (isLoading) {
    return <Loader/>;
  }

  return (
    <Box
      sx={{
        maxWidth: "100rem",
        overflow: "auto",
        padding: "5rem 1rem 2rem",
        margin: "0 auto",
      }}
    >
      {isLoading ? (
        <Loader/>
      ) : (
        <Box
          sx={{
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, 360px)",
            justifyContent: "center",
            gap: "1.5rem",
          }}
        >
          {data.map((person) => (
            <PersonCard
              key={person.id}
              person={person}
              isSelected={!!selectedPersons[person.id]}
              onSelectChange={handleSelectChange}
            />
          ))}
        </Box>
      )}
      <Box sx={{mt: 5, mb: 4, paddingX: "2rem", position: "relative"}}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
            padding: "1rem 0",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: colors.white,
              marginBottom: "1rem",
              flexGrow: "1",
              flexShrink: "0",
            }}
          >
            Enter your request
          </Typography>
          <AssistantSelector
            value={assistant}
            onChange={handleChange}
          />
        </Box>
        <TextField
          fullWidth
          placeholder="Enter your request"
          value={requestText}
          onChange={handleRequestChange}
          disabled={loading}
          variant="outlined"
        />
        <Button
          sx={{marginTop: "1rem"}}
          variant="outlined"
          onClick={streamAnswer}
          color="secondary"
          disabled={
            !requestText.trim() ||
            Object.values(selectedPersons).every((v) => !v) ||
            loading
          }
        >
          {loading ? "Loading...." : "Send Request using Selected Persons"}
        </Button>
        {resultText && (
          <Box
            ref={resultBoxRef}
            sx={{
              marginTop: "3rem",
              backgroundColor: colors.whitePermanet,
              maxHeight: "20rem",
              minHeight: "2rem",
              borderRadius: "12px",
              padding: "24px",
              overflow: "auto",
              transition: "1s",
              color: colors.white,
              border: `1px solid ${colors.orange50}`,
              position: "relative",
            }}
          >
            {loading && !!resultText && <FormattedTextDisplay>{resultText}</FormattedTextDisplay>}
            {!loading && !!resultText && <Editor content={resultText}/>}
          </Box>
        )}
        {resultText && (
          <Box
            onClick={copyToClipboard}
            sx={{
              textAlign: "center",
              color: colors.mainGreen,
              transition: ".3s",
              "&:hover": {
                color: colors.orange,
              },
              cursor: "pointer",
            }}
          >
            <Typography sx={{display: "inline", color: "inherit"}}>
              Copy result:
            </Typography>
            <IconButton
              size="large"
              sx={{
                color: "inherit",
              }}
            >
              <ContentCopyIcon/>
            </IconButton>
          </Box>
        )}
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message="Copied to clipboard!"
      />
    </Box>
  );
};

export default Persons;
