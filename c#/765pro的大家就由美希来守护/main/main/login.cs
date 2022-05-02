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
using System.Timers;
using System.Data.SqlClient;
using System.Data;


namespace main
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private string username = "";
        private string password = "";
        private int pageCount = 0;

        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private void button1_Click(object sender, EventArgs e)
        {
            if (userInput.Text.Trim() == "")
            {
                notification2.Text = "请输入用户名";
                return;
            }
            if (pageCount == 0)
            {
                notification2.Text = "";
                timer2.Enabled = true;
                username = userInput.Text;
            }
        }

        private void timer2_Tick(object sender, EventArgs e)
        {
            if (pageCount == 0) {
                usernameInputBox.Left = usernameInputBox.Left - 50;
                passwordInputBox.Left = passwordInputBox.Left - 50;
                
                if (usernameInputBox.Left <= -575) {
                    timer2.Enabled = false;
                    pageCount = 1;
                }
            }else if (pageCount == 1)
            {
                usernameInputBox.Left = usernameInputBox.Left + 50;
                passwordInputBox.Left = passwordInputBox.Left + 50;

                if (usernameInputBox.Left >= 0)
                {
                    timer2.Enabled = false;
                    pageCount = 0;

                }
            }
        }

        private void button2_Click(object sender, EventArgs e)
        {
            pageCount = 1;
            timer2.Enabled = true;
        }

        private void button1_Click_1(object sender, EventArgs e)
        {


            password = pwdInput.Text;
                SqlQuery query = new SqlQuery(
                    SqlQuery.SELECT,
                    "tbl_user",
                    new SqlEntries[] {
                        new SqlEntries("username", username),
                        new SqlEntries("password", password),
                    },
                    null,
                    null);
                DataSet dataset = Database.requestDBFromAdapter(query.query);

            if (dataset.Tables[0].Rows.Count != 0) { 
                main page = new main();
                page.Show();
                notification.Text = "";
                this.Hide();
            }
            else {
                    notification.Text = "当前用户名密码不存在";
                }
        }

    }
}
