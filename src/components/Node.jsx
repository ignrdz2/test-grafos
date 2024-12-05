import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { Handle, Position } from "@xyflow/react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const Node = ({ id, label, onDelete, onLabelChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempLabel, setTempLabel] = useState(label);

  useEffect(() => {
    setTempLabel(label);
  }, [label]);

  const handleLabelChange = (e) => {
    setTempLabel(e.target.value);
  };

  const handleLabelSubmit = () => {
    onLabelChange(id, tempLabel);
    setIsEditing(false);
  };

  const handleDialogClose = () => {
    setTempLabel(label);
    setIsEditing(false);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px",
        border: "2px solid #ddd",
        borderRadius: "5px",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        position: "relative",
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        style={{ top: "50%", transform: "translateY(-50%)" }}
      />
      <span onClick={() => setIsEditing(true)}>{label || "Nodo"}</span>
      <IconButton onClick={() => onDelete(id)} aria-label="delete">
        <DeleteIcon />
      </IconButton>
      <Handle
        type="source"
        position={Position.Right}
        style={{ top: "50%", transform: "translateY(-50%)" }}
      />

      <Dialog open={isEditing} onClose={handleDialogClose}>
        <DialogTitle>Editar Etiqueta del Nodo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingresa la nueva etiqueta para este nodo.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Etiqueta del Nodo"
            type="text"
            fullWidth
            value={tempLabel}
            onChange={handleLabelChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleLabelSubmit} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Node;
