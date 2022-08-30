board = [];
tile = 0;
class 棋盘覆盖 {

    static chessBoard(/*int*/ tr, /*int*/ tc, /*int*/ dr, /*int*/ dc, /*int*/ size) {
        if (size === 1) return;
        let/*int*/ t = tile++,  // L型骨牌号
        s = size/2;  // 分割棋盘
        if (dr < tr + s && dc < tc + s) // 覆盖左上角子棋盘
            this.chessBoard(tr, tc, dr, dc, s); // 特殊方格在此棋盘中
        else {// 此棋盘中无特殊方格
            board[tr + s - 1][tc + s - 1] = t; // 用 t 号L型骨牌覆盖右下角
            this.chessBoard(tr, tc, tr+s-1, tc+s-1, s);
        } // 覆盖其余方格

        if (dr < tr + s && dc >= tc + s) // 覆盖右上角子棋盘
            this.chessBoard(tr, tc+s, dr, dc, s); // 特殊方格在此棋盘中
        else {// 此棋盘中无特殊方格
            board[tr+s-1][tc+s] = t;// 用 t 号L型骨牌覆盖左下角
            this.chessBoard(tr, tc+s, tr+s-1, tc+s, s);
        }// 覆盖其余方格

        if (dr >= tr + s && dc < tc + s)// 覆盖左下角子棋盘
            this.chessBoard(tr+s, tc, dr, dc, s);// 特殊方格在此棋盘中
        else {// 用 t 号L型骨牌覆盖右上角
            board[tr + s][tc + s - 1] = t;
            this.chessBoard(tr+s, tc, tr+s, tc+s-1, s);
        }// 覆盖其余方格

        if (dr >= tr + s && dc >= tc + s)// 覆盖右下角子棋盘
            this.chessBoard(tr+s, tc+s, dr, dc, s);//特殊方格在此棋盘中
        else {// 用 t 号L型骨牌覆盖左上角
            board[tr + s][tc + s] = t;
            this.chessBoard(tr+s, tc+s, tr+s, tc+s, s);
        }// 覆盖其余方格
    }

   static main(){
        board.length = 8;
        board.fill(new Array(8));
        棋盘覆盖.chessBoard(0,0,2,2,8);


        console.log(board.join("\n"));
    }
}

棋盘覆盖.main();


