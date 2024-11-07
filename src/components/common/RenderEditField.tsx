import React from 'react';

import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { getColor } from '@/utils/getColor';

interface RenderEditFieldProps {
    sectionTitle: string;
    fields: string[];
    handleFieldChange: (field: string, value: string | number) => void;
    editedFields: Record<string, string | number>;
    loading: boolean;
}

const colors = { 
  pink: getColor("pink"),
}

const RenderEditField: React.FC<RenderEditFieldProps> = ({
    sectionTitle,
    fields,
    handleFieldChange,
    editedFields,
    loading
}) => (
    <Box key={sectionTitle + 1}>
        <Typography
            variant='h6'
            sx={{ mt: 2, mb: 1, color: colors.pink }}
        >
            {sectionTitle}
        </Typography>
        {fields.map(field => {
            const value = editedFields[field] || '';
            switch (field) {
                case 'Age':
                case 'Number of Kids':
                    return (
                        <TextField
                            disabled={loading}
                            key={field}
                            label={field}
                            type='number'
                            value={value}
                            onChange={(e) => handleFieldChange(field, parseInt(e.target.value, 10))}
                            fullWidth
                            margin='dense'
                        />
                    );
                case 'Gender':
                    return (
                        <FormControl
                            fullWidth
                            margin='dense'
                            key={field}
                        >
                            <InputLabel>{field}</InputLabel>
                            <Select
                            className="select"
                                disabled={loading}
                                value={value}
                                onChange={(e) => handleFieldChange(field, e.target.value)}
                                label={field}
                            >
                                <MenuItem value='Male'>Male</MenuItem>
                                <MenuItem value='Female'>Female</MenuItem>
                            </Select>
                        </FormControl>
                    );
                case 'Empathy Card':
                case 'Important Values':
                case 'Pain Points':
                case 'Fears':
                case 'Magical Solution':
                case 'Goals and Dreams':
                case 'Materialistic Gains':
                case 'Emotional Win':
                case 'Brand-Values':
                case 'Brand-Examples':
                case 'Brand-Magnet':
                case 'Elevator Pitch':
                case 'Buying Motives':
                case 'Buying Barriers':
                case 'Preferred communication channels':
                case 'Device usage':
                case 'Online behavior':
                    return (
                        <TextField
                            disabled={loading}
                            key={field}
                            label={field}
                            value={value}
                            onChange={(e) => handleFieldChange(field, e.target.value)}
                            fullWidth
                            margin='dense'
                            multiline
                            rows={4}
                        />
                    );
                default:
                    return (
                        <TextField
                            disabled={loading}
                            key={field}
                            label={field}
                            value={value}
                            onChange={(e) => handleFieldChange(field, e.target.value)}
                            fullWidth
                            margin='dense'
                        />
                    );
            }
        })}
    </Box>
);

export default RenderEditField;