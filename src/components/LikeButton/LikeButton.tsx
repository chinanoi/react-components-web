import { useContext, useRef, useState } from "react";
import { ThemeContext } from "../../App";

const LikeButton = () => {

    const [like, setLike] = useState(0);
    const likeRef = useRef(0);
    const theme = useContext(ThemeContext);

    console.log('theme', theme);

    const style = {
        color: theme.color,
        background: theme.background
    };

    return (
        <div style={style}>
            <button onClick={() => { setLike(like + 1); }}>{like}👍🏻</button>
        </div>
    );
};

export default LikeButton;
