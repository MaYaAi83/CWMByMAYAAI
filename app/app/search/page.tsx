"use client"
import { Top } from "@/components/push";
import SearchIcon from '@mui/icons-material/Search';
import { Container, IconButton, Stack, TextField } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Search() {
    const [w, setw] = useState("")
    const router = useRouter()

    return <Container sx={{ textAlign: "center" }}>
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
            <IconButton onClick={() => { router.push(`/search/${w}`) }}>
                <SearchIcon sx={{ color: 'action.active' }} />
            </IconButton>
            <TextField
                label="Search Somethings Interesting"
                fullWidth
                value={w}
                onChange={(e) => setw(e.target.value)}>
            </TextField>
        </Stack>
        <Top index={crypto.randomUUID()} />
        <Link href={"/filter"} prefetch={false}>
            <img src="https://cos.elysia.rip/T_UI_Talk_Face_00100_0008.png" />
        </Link>
    </Container>
}