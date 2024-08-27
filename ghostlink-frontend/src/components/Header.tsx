import { Button } from '@mui/material';

export default function Header() {
  return (
    <div className="w-[65vw] fixed top-8 flex justify-between bg-[rgba(200,200,200,0.1)] backdrop-blur-lg items-center p-5 rounded-full ">
      <Button
        variant="text"
        color="primary"
        sx={{ ml: 2 }}
      >
        GhostWriter
      </Button>
      <div className="flex justify-between">
        <Button
          variant="outlined"
          color="secondary"
          sx={{ ml: 2 }}
        >
          Log in
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{ ml: 2 }}
        >
          Sign up
        </Button>
      </div>
    </div>
  );
}