import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";


export default function Profile_Background() {
  const numStars = 200; // Adjustable for performance

  useEffect(() => {
    const starfield = document.getElementById("starfield");
    if (!starfield) return;

    // Initial star creation
    for (let i = 0; i < numStars; i++) {
      const star = document.createElement("div");
      star.className = "star";
      const size = Math.random() * 2 + 2; // 2-4px
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = `${Math.random() * 100}vh`;
      star.style.animationDelay = `${Math.random() * 20}s`;
      starfield.appendChild(star);
    }

    // Function to spawn stars continuously
    const spawnNewStars = () => {
      const newStar = document.createElement("div");
      newStar.className = "star";
      const size = Math.random() * 2 + 2;
      newStar.style.width = `${size}px`;
      newStar.style.height = `${size}px`;
      newStar.style.left = `${Math.random() * 100}vw`;
      newStar.style.top = `100vh`; // Start from bottom
      newStar.style.animationDelay = `0s`;
      starfield.appendChild(newStar);

      // Remove oldest star
      if (starfield.children.length > numStars * 2) {
        starfield.removeChild(starfield.firstChild);
      }
    };

    const interval = setInterval(spawnNewStars, 200);

    // Cleanup on unmount
    return () => {
      clearInterval(interval);
      starfield.innerHTML = "";
    };
  }, []);

  return (
    <div>
      <div
        id="starfield"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />
      <style>{`
  .star {
    position: absolute;
    background-color: #ffffff;
    border-radius: 50%;
    animation: twinkle 2s infinite alternate, move 20s linear infinite;
  }

  @keyframes twinkle {
    0% { opacity: 0.3; }
    50% { opacity: 0.8; }
    100% { opacity: 0.3; }
  }

  @keyframes move {
    0% { transform: translate(-50vw, 100vh); }
    100% { transform: translate(50vw, -100vh); }
  }
`}</style>
    </div>
  );
}




const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
  transform: expand ? "rotate(180deg)" : "rotate(0deg)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const CustomCard = ({
  title,
  time,
  image,
  description,
  avatarText = "R",
  onDelete,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => setExpanded(!expanded);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="avatar">
            {avatarText}
          </Avatar>
        }
        action={
          <IconButton aria-label="delete" onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        }
        title={title}
        subheader={time}
      />
      <CardMedia component="img" height="194" image={image} alt={title} />
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded ? 1 : 0}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>Extra details go here...</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}