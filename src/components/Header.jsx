
import { Box, AppBar, Toolbar, Select, MenuItem, FormControl, InputLabel  } from "@mui/material"

export default function Header( { topics, selectedTopic, setSelectedTopic }) {

    const handleChange = (event) => {
        setSelectedTopic(parseInt(event.target.value, 10));
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{alignItems: 'flex-end'}}>
                <Toolbar>
                    <FormControl 
                        sx={
                            { 
                                m: 1, 
                                minWidth: 120,
                            }
                        } 
                        size="small"
                    >
                        <InputLabel id="demo-simple-select-label">Topic</InputLabel>
                        <Select
                            labelId="topic-select-label"
                            id="topic-select"
                            label="Topic"
                            value={selectedTopic}
                            onChange={handleChange}
                        >
                            {
                                Object.keys(topics).map((key) => (<MenuItem value={key}>{topics[key]}</MenuItem>))
                            }
                        </Select>
                    </FormControl>
                </Toolbar>
            </AppBar>
        </Box>
    )
}