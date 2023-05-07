public class 棋盘覆盖 {
    public static int board[][];
    public static int tile = 0;
    public static void chessBoard(int tr, int tc, int dr, int dc, int size) {
        if (size == 1) return;
        int t = tile++,  // L型骨牌号
                s = size/2;  // 分割棋盘
        if (dr < tr + s && dc < tc + s) // 覆盖左上角子棋盘
            chessBoard(tr, tc, dr, dc, s); // 特殊方格在此棋盘中
        else {// 此棋盘中无特殊方格
            board[tr + s - 1][tc + s - 1] = t; // 用 t 号L型骨牌覆盖右下角
            chessBoard(tr, tc, tr+s-1, tc+s-1, s);} // 覆盖其余方格

        if (dr < tr + s && dc >= tc + s) // 覆盖右上角子棋盘
            chessBoard(tr, tc+s, dr, dc, s); // 特殊方格在此棋盘中
        else {// 此棋盘中无特殊方格
            board[tr+s-1][tc+s] = t;// 用 t 号L型骨牌覆盖左下角
            chessBoard(tr, tc+s, tr+s-1, tc+s, s);}// 覆盖其余方格

        if (dr >= tr + s && dc < tc + s)// 覆盖左下角子棋盘
            chessBoard(tr+s, tc, dr, dc, s);// 特殊方格在此棋盘中
        else {// 用 t 号L型骨牌覆盖右上角
            board[tr + s][tc + s - 1] = t;
            chessBoard(tr+s, tc, tr+s, tc+s-1, s);}// 覆盖其余方格

        if (dr >= tr + s && dc >= tc + s)// 覆盖右下角子棋盘
            chessBoard(tr+s, tc+s, dr, dc, s);//特殊方格在此棋盘中
        else {// 用 t 号L型骨牌覆盖左上角
            board[tr + s][tc + s] = t;
            chessBoard(tr+s, tc+s, tr+s, tc+s, s);}// 覆盖其余方格
    }

    static public void main(String[] args){
        chessBoard(0,0,1,2,4);
        for(int[] row:board){
            for(int col:row){
                System.out.println(col);
            }
            System.out.println("\n");
        }
    }
}
