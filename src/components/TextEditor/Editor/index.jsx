import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Editor from "@monaco-editor/react";
import { useSelector, useDispatch } from "react-redux";
import "./index.css";
import { typeSimulations } from "../../../interpreter/constants";
import { setErrorLine } from "../../../slices/applicationSlice";

export const MonacoEditor = ({ setEditorValue, editorValue }) => {
  const editorRef = useRef(null);
  const [decorations, setDecorations] = useState([]);
  const dispatch = useDispatch();
  const errorLine = useSelector((state) => state.application.execute.errorLine);
  const handleEditorChange = (value) => {
    if (errorLine) dispatch(setErrorLine(null));
    if (decorations.length > 0) updateDecorations([]);
    setEditorValue(value);
  };
  const [highLightedLineMapper, setHighLightedLineMapper] = useState({});

  const fetchInstructionId = useSelector(
    (state) => state.application.fetch.instructionId
  );

  const decodeInstructionId = useSelector(
    (state) => state.application.decode.instructionId
  );

  const executeInstructionId = useSelector(
    (state) => state.application.execute.instructionId
  );

  const fetchInstructionColor = useSelector(
    (state) => state.application.fetch.color
  );

  const decodeInstructionColor = useSelector(
    (state) => state.application.decode.color
  );

  const executeInstructionColor = useSelector(
    (state) => state.application.execute.color
  );

  const actualTypeSimulation = useSelector(
    (state) => state.application.typeSimulations
  );

  const isSimulating = useSelector((state) => state.application.isSimulating);

  useEffect(() => {
    if (!isSimulating) return;
    const lineMapping = editorValue.split("\n").reduce((acc, line, index) => {
      if (line.trim() !== "") {
        acc[Object.keys(acc).length + 1] = index + 1;
      }
      return acc;
    }, {});

    setHighLightedLineMapper(lineMapping);
  }, [editorValue, isSimulating]);

  const colorMapper = {
    "var(--im-green)": "green",
    "var(--im-pink)": "pink",
    "var(--im-yellow)": "yellow",
    "var(--im-blue)": "blue",
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    updateDecorations();
  };

  const fetchLine = useMemo(() => {
    if (fetchInstructionId === null || fetchInstructionId === -1) return null;
    return {
      number: fetchInstructionId + 1,
      color: colorMapper[fetchInstructionColor],
    };
  }, [fetchInstructionId, fetchInstructionColor]);

  const decodeLine = useMemo(() => {
    if (decodeInstructionId === null || decodeInstructionId === -1) {
      return null;
    }
    return {
      number: decodeInstructionId + 1,
      color: colorMapper[decodeInstructionColor],
    };
  }, [decodeInstructionId, decodeInstructionColor]);

  const executeLine = useMemo(() => {
    if (executeInstructionId === null || executeInstructionId === -1)
      return null;
    const executeLine = {
      number:
        actualTypeSimulation === typeSimulations.PIPELINING
          ? executeInstructionId + 1
          : executeInstructionId,
      color: colorMapper[executeInstructionColor],
    };
    return executeLine;
  }, [executeInstructionId]);

  const lineNumberFormatter = useCallback((lineNumber) => {
    if (!editorRef || !editorRef.current) return lineNumber;
    const model = editorRef.current.getModel();
    const totalLines = model.getLineCount();
    let hexCounter = 0;
    for (let i = 1; i <= totalLines; i++) {
      const lineContent = model.getLineContent(i);
      if (lineContent.trim() !== "") {
        if (i === lineNumber) {
          return hexCounter.toString(16).padStart(2, "0").toUpperCase();
        }
        hexCounter += 2;
      }
    }
    return " ";
  }, []);

  const options = {
    selectOnLineNumbers: true,
    lineNumbers: lineNumberFormatter,
    lineNumbersMinChars: 3,
    lineDecorationsWidth: "0px",
    minimap: { enabled: false },
    glyphMargin: isSimulating || errorLine !== null,
    readOnly: isSimulating,
  };

  const addLineDecoration = (line, decorations) => {
    if (line) {
      const highLightedLineNumber = highLightedLineMapper[line.number];
      decorations.push({
        range: new monaco.Range(
          highLightedLineNumber,
          1,
          highLightedLineNumber,
          1
        ),
        options: {
          isWholeLine: true,
          glyphMarginClassName: `fa fa-solid fa-arrow-right fa-xs glyph-margin-color-${line.color} glyph-margin`,
        },
      });
    }
  };

  useEffect(() => {
    if (errorLine && !isSimulating) {
      setDecorations(
        editorRef.current.deltaDecorations(decorations, [
          {
            range: new monaco.Range(errorLine + 1, 1, errorLine + 1, 1),
            options: {
              isWholeLine: true,
              className: "line-error-highlight",
              glyphMarginClassName: `fa fa-solid fa-times fa-xs glyph-margin-color-red glyph-margin`,
            },
          },
        ])
      );
    } else if (!isSimulating) {
      if (decorations.length > 0) {
        setDecorations(editorRef.current.deltaDecorations(decorations, []));
      }
    }
  }, [errorLine, isSimulating]);

  const updateDecorations = () => {
    if (!editorRef.current) return;
    let newDecoration = [];
    addLineDecoration(fetchLine, newDecoration);
    addLineDecoration(decodeLine, newDecoration);
    addLineDecoration(executeLine, newDecoration);
    if (!isSimulating) return;
    setDecorations(
      editorRef.current.deltaDecorations(decorations, newDecoration)
    );
  };

  useEffect(() => {
    if (!isSimulating) return;
    updateDecorations();
  }, [
    fetchInstructionId,
    decodeInstructionId,
    executeInstructionId,
    isSimulating,
  ]);

  return (
    <Editor
      height="100%"
      theme="vs-dark"
      value={editorValue}
      onChange={handleEditorChange}
      options={options}
      onMount={handleEditorDidMount}
    />
  );
};
