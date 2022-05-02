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
    public partial class customerLiveIn : Form
    {
        public customerLiveIn()
        {
            InitializeComponent();
        }



        private void customerLiveIn_Load(object sender, EventArgs e)
        {
            SqlQuery query = new SqlQuery(
                SqlQuery.SELECT,
                "tbl_customer",
                null,
                null, null);
            DataSet dataset = Database.requestDBFromAdapter(query.query);

            for (int i = 0, len = dataset.Tables[0].Rows.Count; i < len; i++) {
                if (dataset.Tables[0].Rows[i].ItemArray[2].ToString() == "1") {
                    dataset.Tables[0].Rows[i].ItemArray[2] = "女";
                }else if (dataset.Tables[0].Rows[i].ItemArray[2].ToString() == "0") {
                    dataset.Tables[0].Rows[i].ItemArray[2] = "男";
                }
            }
            dataGridView1.DataSource = dataset.Tables[0];

            dataGridView1.Columns["id"].HeaderText = "身份证号";
            dataGridView1.Columns["name"].HeaderText = "姓名";
            dataGridView1.Columns["gender"].HeaderText = "性别";
            dataGridView1.Columns["age"].HeaderText = "年龄";
            dataGridView1.Columns["start"].HeaderText = "开始居住时间";
            dataGridView1.Columns["room"].HeaderText = "房间ID";
            dataGridView1.Columns["deposit"].HeaderText = "押金";
            dataGridView1.Columns["id"].ReadOnly = true;


            //DateTime nowDate = DateTime.Now;
            //dateTimePicker1.Value = nowDate;
        }

        private void saveEdit(object sender, DataGridViewCellEventArgs e)
        {

            string id = "";
            string name = "";
            string gender = "";
            string age = "";
            string start = "";
            string room = "";
            string deposit = "";
            try
            {
                id = dataGridView1.Rows[e.RowIndex].Cells[0].Value.ToString();
                name = dataGridView1.Rows[e.RowIndex].Cells[1].Value.ToString();
                gender = dataGridView1.Rows[e.RowIndex].Cells[2].Value.ToString();
                age = dataGridView1.Rows[e.RowIndex].Cells[3].Value.ToString();
                start = dataGridView1.Rows[e.RowIndex].Cells[4].Value.ToString();
                room = dataGridView1.Rows[e.RowIndex].Cells[5].Value.ToString();
                deposit = dataGridView1.Rows[e.RowIndex].Cells[6].Value.ToString();
            }
            catch {
                notification.Text = "基础信息不完善";
            }
            if (id == "") {
                notification.Text = "请指定ID信息";
                dataGridView1.Columns["id"].ReadOnly = false;
            }
            try
            {
                if (int.Parse(id) < 0)
                {
                    notification.Text = "ID不能是负数";
                    return;
                }
            }
            catch
            {
                notification.Text = "输入不合法";
                return;
            }
            SqlQuery query = null;
            DataSet dataset = null;
            query = new SqlQuery(SqlQuery.SELECT, "tbl_blackList",
                new SqlEntries[] {
                    new SqlEntries("id",id)
                }, null, null);
            dataset = Database.requestDBFromAdapter(query.query);
            if (dataset.Tables[0].Rows.Count != 0) {
                MessageBox.Show("请注意，您所输入的用户已经被列入黑名单");
                    
            }

            query = new SqlQuery(SqlQuery.SELECT,
                "tbl_customer",
                new SqlEntries[] {
                     new SqlEntries("id", id)
                },
                null,
                new SqlEntries[] {

                    new SqlEntries("room", room)
                });
            dataset = Database.requestDBFromAdapter(query.query);
            string old_room = "";
            try
            {
                old_room = dataset.Tables[0].Rows[0].ItemArray[0].ToString();
            }
            catch
            {
                notification.Text = "此用户没有房间号";
            }

            if (room != ""){
                try
                {
                    query = new SqlQuery(SqlQuery.SELECT,
                        "tbl_roomMNG",
                        new SqlEntries[] {
                    new SqlEntries("rno",room)
                        }, null,
                        new SqlEntries("livein", "0"));
                    dataset = Database.requestDBFromAdapter(query.query);
                
                    if (dataset.Tables[0].Rows[0].ItemArray[0].ToString() == "1" &&
                        old_room != room)
                    {
                        notification.Text = "您所指定的房间已经被占用";
                        return;
                    }
                }
                catch
                {
                    notification.Text = "您所指定的房间好像不存在";
                    return;
                }
            }

            try {
                if (useDateTime) { 
                    start = selBirthday[0] + "/" + selBirthday[1] + "/" + selBirthday[2];
                    //MessageBox.Show((selBirthday[0].Trim() != "").ToString());
                    dataGridView1.Rows[e.RowIndex].Cells[4].Value = start;
                }
            }
            catch { 
                try
                {
                    int a = int.Parse(start.Split('/')[0]);
                    int b = int.Parse(start.Split('/')[1]);
                    int c = int.Parse(start.Split('/')[2].Substring(0, 4));
                }
                catch
                {
                    notification.Text = "你输入的日期有误，形式应为Month/Day/Year";
                }
            }


            query = new SqlQuery(
                SqlQuery.UPDATE,
                "tbl_customer",
                new SqlEntries[] {
                    new SqlEntries("id", id),
                },
                new SqlEntries("id", "desc"),
                new SqlEntries[] {
                    new SqlEntries("name", name),
                    new SqlEntries("gender", (gender == "女")?"女":"男"),
                    new SqlEntries("age", age),
                    new SqlEntries("start", start),
                    new SqlEntries("room", room),
                    new SqlEntries("deposit", deposit)
                });
            int line = 0;
            try
            {
                line = Database.requestDBFromCommand(query.query);
            }
            catch {
                
            }
            if (line > 0)
            {
                notification.Text = "已自动保存";
            }
            else
            {
                notification.Text = "更改出问题";

                query = new SqlQuery(
                SqlQuery.INSERT,
                "tbl_customer",
                new SqlEntries[] {
                    new SqlEntries("id", id),
                },
                new SqlEntries("id", "desc"),
                new SqlEntries[] {
                    new SqlEntries("id", id),
                    new SqlEntries("name", name),
                    new SqlEntries("gender", (gender == "女")?"女":"男"),
                    new SqlEntries("age", age),
                    new SqlEntries("start", start),
                    new SqlEntries("room", room),
                    new SqlEntries("deposit", deposit),
                   
                });
               
                try
                {
                    line = Database.requestDBFromCommand(query.query);
                }
                catch
                {
                    MessageBox.Show(query.query);
                    notification.Text = "添加出问题";
                }
                if (line > 0)
                {
                    notification.Text = "已自动添加";
                    dataGridView1.Columns["id"].ReadOnly = true;


                }
            }
            query = new SqlQuery(SqlQuery.UPDATE,
                "tbl_roomMNG",
                new SqlEntries[] {
                    new SqlEntries("rno",room)
                }, null,
                new SqlEntries("livein", "1"));
            line = Database.requestDBFromCommand(query.query);
            if (line > 0) {
                notification.Text += "，房间占用完毕";

                if (old_room != room) {
                    query = new SqlQuery(SqlQuery.UPDATE,
                    "tbl_roomMNG",
                    new SqlEntries[] {
                        new SqlEntries("rno",old_room)
                    }, null,
                    new SqlEntries("livein", "0"));
                    line = Database.requestDBFromCommand(query.query);
                    if (line > 0)
                    {
                        notification.Text += "，以前的房间已经停止占用";
                    }
                }

            }




        }
        private void refresh(object sender, EventArgs e)
        {
            SqlQuery query = new SqlQuery(
                SqlQuery.SELECT,
                "tbl_customer",
                null,
                null, null);
            DataSet dataset = Database.requestDBFromAdapter(query.query);

            dataGridView1.DataSource = dataset.Tables[0];

            dataGridView1.Columns["id"].HeaderText = "身份证号";
            dataGridView1.Columns["name"].HeaderText = "姓名";
            dataGridView1.Columns["gender"].HeaderText = "性别";
            dataGridView1.Columns["age"].HeaderText = "年龄";
            dataGridView1.Columns["start"].HeaderText = "开始居住时间";
            dataGridView1.Columns["room"].HeaderText = "房间ID";
            dataGridView1.Columns["deposit"].HeaderText = "押金";

        }
        private void deleteRow(object sender, EventArgs e)
        {
            int rowindex = dataGridView1.SelectedCells[0].RowIndex;
            string id = dataGridView1.Rows[rowindex].Cells[0].Value.ToString();

            SqlQuery query = new SqlQuery(SqlQuery.SELECT,
                "tbl_customer",
                new SqlEntries[] {
                    new SqlEntries("id",id),
                }, null,
                new SqlEntries[] {
                    new SqlEntries("room",id)
                });
            DataSet dataset = Database.requestDBFromAdapter(query.query);
            string room = "";
            try
            {
                room = dataset.Tables[0].Rows[0].ItemArray[0].ToString();
            }
            catch {
                notification.Text = "请指定删除项";
            }
            query = new SqlQuery(
                SqlQuery.DELETE,
                "tbl_customer",
                new SqlEntries[] {
                    new SqlEntries("id",id),
                },
                null, null);
            int line = Database.requestDBFromCommand(query.query);
            if (line > 0)
            {
                notification.Text = "已删除";
            }
            
            query = new SqlQuery(SqlQuery.UPDATE,
                "tbl_roomMNG",
                new SqlEntries[] {
                    new SqlEntries("rno",room)
                }, null,
                new SqlEntries("livein", "0"));
            line = Database.requestDBFromCommand(query.query);
            if (line > 0)
            {
                notification.Text += "，房间解除占用";
            }
        }



        private void inputgender(object sender, EventArgs e)
        {
            int rowindex = dataGridView1.SelectedCells[0].RowIndex;
            dataGridView1.Rows[rowindex].Cells[2].Value = genderSel.Text.ToString();
            saveEdit(null, new DataGridViewCellEventArgs(0, rowindex));


        }
        private string[] selBirthday = new string[3] ;


        private DateTime date;
        private bool useDateTime = false;

        private void dateTimePicker1_ValueChanged(object sender, EventArgs e)
        {
            date = dateTimePicker1.Value;
            selBirthday[0] = dateTimePicker1.Value.Month.ToString();
            selBirthday[1] = dateTimePicker1.Value.Day.ToString();
            selBirthday[2] = dateTimePicker1.Value.Year.ToString();
            useDateTime = true;
            int rowindex = dataGridView1.SelectedCells[0].RowIndex;
            saveEdit(null, new DataGridViewCellEventArgs(0, rowindex));
        }

        private void label2_Click(object sender, EventArgs e)
        {

        }
    }
}
