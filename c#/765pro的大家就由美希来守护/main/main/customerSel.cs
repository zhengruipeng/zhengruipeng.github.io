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
    public partial class customerSel : Form
    {
        public customerSel()
        {
            InitializeComponent();
        }

        private void customerSel_Load(object sender, EventArgs e)
        {
            SqlQuery query = new SqlQuery(
                SqlQuery.SELECT,
                "tbl_customer",
                null,
                null, null);
            DataSet dataset = Database.requestDBFromAdapter(query.query);
            dataGridView1.DataSource = dataset.Tables[0];
            for (int i = 0, len = dataset.Tables[0].Columns.Count; i < len; i++) {
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

            
        {

            if (selectConstrainer.Text == "" ||
                searchValue.Text == "") {
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
    }
}
