using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Drawing.Drawing2D;
namespace main
{
    public partial class main : Form
    {
        static public int MAX_INT = 99999999;
        static public int MAX_STRING_LENGTH = 20;
        private void controlPage1_Load(object sender, EventArgs e)
        {
            timer3.Enabled = true;
            horizonLine.BackgroundImageLayout = new ImageLayout();
            //verticalLine2.BackgroundImageLayout = new ImageLayout();
            //verticalLine2.Top = 700;
        }
        public main()
        {
            InitializeComponent();
        }
        //前两个参数固定，第三个参数为圆角半径，第四个参数是尖角，五六个参数为颜色渐变
        private void Draw(Rectangle rectangle, Graphics g, int _radius, bool cusp, Color begin_color, Color end_color)
        {
            int span = 2;
            //抗锯齿
            g.SmoothingMode = SmoothingMode.AntiAlias;
            //渐变填充
            LinearGradientBrush myLinearGradientBrush = new LinearGradientBrush(rectangle, begin_color, end_color, LinearGradientMode.Vertical);
            //画尖角
            if (cusp)
            {
                span = 10;
                PointF p1 = new PointF(rectangle.Width - 12, rectangle.Y + 10);
                PointF p2 = new PointF(rectangle.Width - 12, rectangle.Y + 30);
                PointF p3 = new PointF(rectangle.Width, rectangle.Y + 20);
                PointF[] ptsArray = { p1, p2, p3 };
                g.FillPolygon(myLinearGradientBrush, ptsArray);
            }
            //填充
            g.FillPath(myLinearGradientBrush, DrawRoundRect(rectangle.X, rectangle.Y, rectangle.Width - span, rectangle.Height - 1, _radius));
        }
        public static GraphicsPath DrawRoundRect(int x, int y, int width, int height, int radius)
        {
            //四边圆角
            GraphicsPath gp = new GraphicsPath();
            gp.AddArc(x, y, radius, radius, 180, 90);
            gp.AddArc(width - radius, y, radius, radius, 270, 90);
            gp.AddArc(width - radius, height - radius, radius, radius, 0, 90);
            gp.AddArc(x, height - radius, radius, radius, 90, 90);
            gp.CloseAllFigures();
            return gp;
        }

        private void panel1_Paint(object sender, PaintEventArgs e)
        {
            Draw(e.ClipRectangle, e.Graphics, 18, true, Color.FromArgb(90, 143, 0), Color.FromArgb(41, 67, 0));
            base.OnPaint(e);
            Graphics g = e.Graphics;
            g.DrawString("其实我是个Panel", new Font("微软雅黑", 9, FontStyle.Regular), new SolidBrush(Color.White), new PointF(10, 10));
        }

        private void panel2_Paint(object sender, PaintEventArgs e)
        {
            Draw(e.ClipRectangle, e.Graphics, 18, false, Color.FromArgb(113, 113, 113), Color.FromArgb(0, 0, 0));
            base.OnPaint(e);
            Graphics g = e.Graphics;
            g.DrawString("其实我是个Panel", new Font("微软雅黑", 9, FontStyle.Regular), new SolidBrush(Color.White), new PointF(10, 10));
        }

        private void button1_Paint(object sender, PaintEventArgs e)
        {
            Draw(e.ClipRectangle, e.Graphics, 18, false, Color.FromArgb(0, 122, 204), Color.FromArgb(8, 39, 57));
            base.OnPaint(e);
            Graphics g = e.Graphics;
            g.DrawString("其实我是个按钮", new Font("微软雅黑", 9, FontStyle.Regular), new SolidBrush(Color.White), new PointF(10, 10));
        }

        private void typeMNGPaint(object sender, PaintEventArgs e)
        {
            Draw(e.ClipRectangle, e.Graphics, 5, false, Color.FromArgb(187, 57, 209), Color.FromArgb(230, 87, 255));
            base.OnPaint(e);

            Graphics g = e.Graphics;
            g.DrawString("客房类型管理", new Font("微软雅黑", 14, FontStyle.Regular), new SolidBrush(Color.White), new PointF(20, 10));
        }
        private void rootMNGPaint(object sender, PaintEventArgs e)
        {
            Draw(e.ClipRectangle, e.Graphics, 5, false, Color.FromArgb(187, 57, 209), Color.FromArgb(230, 87, 255));
            base.OnPaint(e);

            Graphics g = e.Graphics;
            g.DrawString("客房管理", new Font("微软雅黑", 14, FontStyle.Regular), new SolidBrush(Color.White), new PointF(20, 10));
        }
        private void divOver(object sender, EventArgs e)
        {

        }

        private void checkMNGPaint(object sender, PaintEventArgs e)
        {
            Draw(e.ClipRectangle, e.Graphics, 5, false, Color.FromArgb(187, 57, 209), Color.FromArgb(230, 87, 255));
            base.OnPaint(e);

            Graphics g = e.Graphics;
            g.DrawString("客户入住", new Font("微软雅黑", 14, FontStyle.Regular), new SolidBrush(Color.White), new PointF(20, 10));

        }

        private void customSelPaint(object sender, PaintEventArgs e)
        {
            Draw(e.ClipRectangle, e.Graphics, 5, false, Color.FromArgb(187, 57, 209), Color.FromArgb(230, 87, 255));
            base.OnPaint(e);

            Graphics g = e.Graphics;
            g.DrawString("客户查询", new Font("微软雅黑", 14, FontStyle.Regular), new SolidBrush(Color.White), new PointF(20, 10));

        }

        private void balancePaint(object sender, PaintEventArgs e)
        {
            Draw(e.ClipRectangle, e.Graphics, 5, false, Color.FromArgb(187, 57, 209), Color.FromArgb(230, 87, 255));
            base.OnPaint(e);

            Graphics g = e.Graphics;
            g.DrawString("客户结算", new Font("微软雅黑", 14, FontStyle.Regular), new SolidBrush(Color.White), new PointF(20, 10));

        }

        private void horizonLineShow(object sender, EventArgs e)
        {
            if (horizonLine.Left>=-60) {
                timer1.Enabled = false;
                timer2.Enabled = true;
                openAppTimer.Enabled = true;
            }
            horizonLine.Left = horizonLine.Left + 60;
            
        }

        private void verticalLineShow(object sender, EventArgs e)
        {
            /*if (verticalLine2.Top <= 50)
            {
                timer2.Enabled = false;

            }
            verticalLine2.Top = verticalLine2.Top - 50;*/
            label1.Visible = true;

        }

        private void showFont1(object sender, EventArgs e)
        {
            timer4.Enabled = true;
            timer3.Enabled = false;
            welcome.Text = "你可以通过导航来进行系统操作";
            timer1.Enabled = true;

        }

        private void showFont2(object sender, EventArgs e)
        {
            timer4.Enabled = false;


        }

        private string openedApp = "";

        

        private void openApp(object sender, EventArgs e)
        {

            if (openedApp == "typeMNG") {
                typeMNG windows = null;
                windows = new typeMNG();
                windows.Show();
            }
            else if (openedApp == "roomMNG")
            {
                roomMNG windows = null;
                windows = new roomMNG();
                windows.Show();
            }
            else if (openedApp == "customerLiveIn")
            {
                customerLiveIn windows = null;
                windows = new customerLiveIn();
                windows.Show();
            }
            else if (openedApp == "customerSel")
            {
                customerSel windows = null;
                windows = new customerSel();
                windows.Show();
            }
            else if (openedApp == "balance")
            {
                balance windows = null;
                windows = new balance();
                windows.Show();
            }
            openAppTimer.Enabled = false;



        }
        private void typeMNGClick(object sender, EventArgs e)
        {
            this.openedApp = "typeMNG";
            openAppTimer.Enabled = true;
            timer3.Enabled = false;
            timer4.Enabled = false;
            horizonLine.Left = 0;
            label1.Visible = true;

            welcome.Text = "你可以通过导航来进行系统操作";

            //verticalLine2.Top = 0;
        }
        private void roomMNGClick(object sender, EventArgs e)
        {
            this.openedApp = "roomMNG";
            openAppTimer.Enabled = true;
            timer3.Enabled = false;
            timer4.Enabled = false;
            horizonLine.Left = 0;
            label1.Visible = true;

            welcome.Text = "你可以通过导航来进行系统操作";

            //verticalLine2.Top = 0;
        }

        private void label8_Click(object sender, EventArgs e)
        {
            //this.openedApp = "customerLiveIn";
            //openAppTimer.Enabled = true;
            customerLiveIn windows = null;
            windows = new customerLiveIn();
            windows.Show();
            timer3.Enabled = false;
            timer4.Enabled = false;
            horizonLine.Left = 0;
            label1.Visible = true;

            welcome.Text = "你可以通过导航来进行系统操作";

            //verticalLine2.Top = 0;
        }

        private void label7_Click(object sender, EventArgs e)
        {
            this.openedApp = "customerSel";
            openAppTimer.Enabled = true;
            timer3.Enabled = false;
            timer4.Enabled = false;
            horizonLine.Left = 0;
            label1.Visible = true;

            welcome.Text = "你可以通过导航来进行系统操作";

            //verticalLine2.Top = 0;
        }

        private void label6_Click(object sender, EventArgs e)
        {
            this.openedApp = "balance";
            openAppTimer.Enabled = true;
            timer3.Enabled = false;
            timer4.Enabled = false;
            horizonLine.Left = 0;
            label1.Visible = true;

            welcome.Text = "你可以通过导航来进行系统操作";

            //verticalLine2.Top = 0;
        }
    }
}
