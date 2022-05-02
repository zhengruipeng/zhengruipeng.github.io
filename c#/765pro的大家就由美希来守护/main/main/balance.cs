using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace main
{
    public partial class balance : Form
    {
        public balance()
        {
            InitializeComponent();
        }

        private int ensureToBalance = 0;

        private int fetchPriceWithRoom(string room) {
            SqlQuery query = new SqlQuery(SqlQuery.SELECT,
                "tbl_roomMNG",
                new SqlEntries[] { new SqlEntries("rno", room) },
                null,
                new SqlEntries[] { new SqlEntries("type", room) }
            );

            DataSet dataset = Database.requestDBFromAdapter(query.query);
            string typename = dataset.Tables[0].Rows[0].ItemArray[0].ToString();
            query = new SqlQuery(SqlQuery.SELECT,
                            "tbl_typeMNG",
                            new SqlEntries[] { new SqlEntries("typename", typename) },
                            null,
                            new SqlEntries[] { new SqlEntries("price", room) }
                        );

            dataset = Database.requestDBFromAdapter(query.query);
            int price = int.Parse(dataset.Tables[0].Rows[0].ItemArray[0].ToString());

            return price;
        }
        private void setupBalance(object sender, EventArgs e)
        {
            if (ensureToBalance == 0) {
                notification.Text = "请再次点击摁扭以确认结算";
                ensureToBalance = 1;
                return;
            }
            string id = "";
            try
            {
                int rowindex = dataGridView1.SelectedCells[0].RowIndex;
                id = dataGridView1.Rows[rowindex].Cells[0].Value.ToString();
            }
            catch {
                notification.Text = "请选择结算客户";
                return;
            }

            SqlQuery query = new SqlQuery(
                SqlQuery.SELECT,
                "tbl_customer",
                new SqlEntries[] { new SqlEntries("id",id)},
                null, null);
            DataSet dataset = Database.requestDBFromAdapter(query.query);
            string start = "";
            string room = "";
            int deposit = 0;
            try
            {
                start = dataset.Tables[0].Rows[0].ItemArray[4].ToString();
                room = dataset.Tables[0].Rows[0].ItemArray[5].ToString();
                deposit = int.Parse(dataset.Tables[0].Rows[0].ItemArray[6].ToString());
            }
            catch {
                notification.Text = "用户信息不完善";
            }
            int price = fetchPriceWithRoom(room);
            /*
            int month = int.Parse(start.Split('/')[0]);
            int day = int.Parse(start.Split('/')[1]);
            int year = int.Parse(start.Split('/')[2].Substring(0, 4));

            string date = DateTime.Now.ToString("yyyy-MM-dd");
            int nowYear = int.Parse(date.Split('-')[0]);
            int nowMonth = int.Parse(date.Split('-')[1]);
            int nowDay = int.Parse(date.Split('-')[2]);

            int days = nowDay - day + (nowMonth - month) * 30 + (nowYear - year) * 365;
            */
            DateTime startTime = Convert.ToDateTime(start);
            DateTime nowTime = DateTime.Now;
            TimeSpan daysSpan = startTime - nowTime;
            int days = daysSpan.Days;


            notification.Text = "您共住" + days + "天，押金"+deposit+"元，需要缴纳"+ (price* days-deposit) + "元";
            if (price * days - deposit > 1000 && price * days - deposit < 5000)
            {
                notification.Text += "，打七折，实缴" + (price * days - deposit) * 0.7;
            }
            else if (price * days - deposit > 5000) {
                notification.Text += "，打五折，实缴" + (price * days - deposit) * 0.5;

            }

            ensureToBalance = 0;
        }

        private void balance_Load(object sender, EventArgs e)
        {
            SqlQuery query = new SqlQuery(
                SqlQuery.SELECT,
                "tbl_customer",
                null,
                null, null);
            DataSet dataset = Database.requestDBFromAdapter(query.query);
            dataGridView1.DataSource = dataset.Tables[0];
            for (int i = 0, len = dataset.Tables[0].Columns.Count; i < len; i++)
            {
                selectConstrainer.Items.Add(dataset.Tables[0].Columns[i].Caption);
            }

            dataGridView1.Columns["id"].HeaderText = "身份证号";
            dataGridView1.Columns["name"].HeaderText = "姓名";
            dataGridView1.Columns["gender"].HeaderText = "性别";
            dataGridView1.Columns["age"].HeaderText = "年龄";
            dataGridView1.Columns["start"].HeaderText = "开始居住时间";
            dataGridView1.Columns["room"].HeaderText = "房间ID";
            dataGridView1.Columns["deposit"].HeaderText = "押金";


            dataGridView1.Columns["id"].ReadOnly = true;
            dataGridView1.Columns["name"].ReadOnly = true;
            dataGridView1.Columns["gender"].ReadOnly = true;
            dataGridView1.Columns["age"].ReadOnly = true;
            dataGridView1.Columns["start"].ReadOnly = true;
            dataGridView1.Columns["room"].ReadOnly = true;
            dataGridView1.Columns["deposit"].ReadOnly = true;

        }

        private void selectStart(object sender, EventArgs e)
        {
            if (selectConstrainer.Text == "" ||
               searchValue.Text == "")
            {
                notification.Text = "请继续完善信息";
                return;
            }
            SqlQuery query = new SqlQuery(
                            SqlQuery.SELECT,
                            "tbl_customer",
                            new SqlEntries[]{
                                new SqlEntries(selectConstrainer.Text,searchValue.Text)
                            },
                            null, null);
            DataSet dataset = Database.requestDBFromAdapter(query.query);

            dataGridView1.DataSource = dataset.Tables[0];
        }

        private void dataGridView1_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {

        }
    }
}
