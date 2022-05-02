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
    public partial class typeMNG : Form
    {
        public typeMNG()
        {
            InitializeComponent();
        }

        private void typeMNG_Load(object sender, EventArgs e)
        {
            SqlQuery query = new SqlQuery(
                SqlQuery.SELECT,
                "tbl_typeMNG",
                null,
                null,null);
            DataSet dataset = Database.requestDBFromAdapter(query.query);
            
            dataGridView1.DataSource = dataset.Tables[0];

            dataGridView1.Columns["id"].HeaderText = "ID";
            dataGridView1.Columns["typename"].HeaderText = "类型名";
            dataGridView1.Columns["area"].HeaderText = "面积";
            dataGridView1.Columns["bathroom"].HeaderText = "卫生间是否配置";
            dataGridView1.Columns["furniture"].HeaderText = "家具是否配置";
            dataGridView1.Columns["drink"].HeaderText = "饮品配置";
            dataGridView1.Columns["meal"].HeaderText = "饮食配置";
            dataGridView1.Columns["price"].HeaderText = "单价";


            dataGridView1.Columns["id"].ReadOnly = true;
        }

        private void saveData(object sender, EventArgs e)
        {
            /*DataSet dataset = new DataSet();
            for (int i = 0, len = dataGridView1.RowCount; i < len; i++) {
                dataset.Tables[0].
            }


            dataset.Tables[0];*/
        }

        private void saveEdit(object sender, DataGridViewCellEventArgs e)
        {
            string id = "";
            string typename = "";
            string area = "";
            string bathroom = "";
            string furniture = "";
            string drink = "";
            string meal = "";
            string price = "";
            try
            {
                id = dataGridView1.Rows[e.RowIndex].Cells[0].Value.ToString();
                typename = dataGridView1.Rows[e.RowIndex].Cells[1].Value.ToString();
                area = dataGridView1.Rows[e.RowIndex].Cells[2].Value.ToString();
                bathroom = dataGridView1.Rows[e.RowIndex].Cells[3].Value.ToString();
                furniture = dataGridView1.Rows[e.RowIndex].Cells[4].Value.ToString();
                drink = dataGridView1.Rows[e.RowIndex].Cells[5].Value.ToString();
                meal = dataGridView1.Rows[e.RowIndex].Cells[6].Value.ToString();
                price = dataGridView1.Rows[e.RowIndex].Cells[7].Value.ToString();
            }
            catch {

            }
            if (id == "")
            {
                notification.Text = "请指定ID信息";
                dataGridView1.Columns["id"].ReadOnly = false;

                //return;
            }
            try
            {
                if (int.Parse(area) > main.MAX_INT)
                {
                    notification.Text = "房间面积过大";
                    return;
                }
                if (int.Parse(price) > main.MAX_INT)
                {
                    notification.Text = "价格过高";
                    return;
                }
                if (int.Parse(id) < 0)
                {
                    notification.Text = "ID不能是负数";
                    return;
                }
            }
            catch {
                notification.Text = "输入不合法";
                return;
            }

            if (id.Length > main.MAX_STRING_LENGTH||
                typename.Length > main.MAX_STRING_LENGTH) {
                notification.Text = "输入过长";
            }
            bathroom = (bathroom == "1" || bathroom == "0") ? bathroom : "1";
            furniture = (furniture == "1" || furniture == "0") ? furniture : "1";
            drink = (drink == "1" || drink == "0") ? drink : "1";
            meal = (meal == "1" || meal == "0") ? meal : "1";

            SqlQuery query = new SqlQuery(
                SqlQuery.UPDATE,
                "tbl_typeMNG",
                new SqlEntries[] {
                    new SqlEntries("id", id),
                },
                new SqlEntries("id", "desc"),
                new SqlEntries[] {
                    new SqlEntries("typename", typename),
                    new SqlEntries("area", area),
                    new SqlEntries("bathroom", bathroom),
                    new SqlEntries("furniture", furniture),
                    new SqlEntries("drink", drink),
                    new SqlEntries("meal", meal),
                    new SqlEntries("price", price)
                });
            int line = 0;
            line = Database.requestDBFromCommand(query.query);

            if (line > 0)
            {
                notification.Text = "已自动保存";

            }
            else {
                notification.Text = "更改出问题";

                query = new SqlQuery(
                SqlQuery.INSERT,
                "tbl_typeMNG",
                new SqlEntries[] {
                    new SqlEntries("id", id),
                },
                new SqlEntries("id", "desc"),
                new SqlEntries[] {
                    new SqlEntries("id", id),
                    new SqlEntries("typename", typename),
                    new SqlEntries("area", area),
                    new SqlEntries("bathroom", bathroom),
                    new SqlEntries("furniture", furniture),
                    new SqlEntries("drink", drink),
                    new SqlEntries("meal", meal),
                    new SqlEntries("price", price)
                });
                try
                {
                    line = Database.requestDBFromCommand(query.query);
                }
                catch
                {
                    notification.Text = "添加出问题";
                }
                if (line > 0)
                {
                    notification.Text = "已自动添加";
                    dataGridView1.Columns["id"].ReadOnly = true;


                }
            }
        }

        private void refresh(object sender, EventArgs e)
        {
            SqlQuery query = new SqlQuery(
                SqlQuery.SELECT,
                "tbl_typeMNG",
                null,
                null, null);
            DataSet dataset = Database.requestDBFromAdapter(query.query);

            dataGridView1.DataSource = dataset.Tables[0];


            dataGridView1.Columns["id"].HeaderText = "ID";
            dataGridView1.Columns["typename"].HeaderText = "类型名";
            dataGridView1.Columns["area"].HeaderText = "面积";
            dataGridView1.Columns["bathroom"].HeaderText = "卫生间是否配置";
            dataGridView1.Columns["furniture"].HeaderText = "家具是否配置";
            dataGridView1.Columns["drink"].HeaderText = "饮品配置";
            dataGridView1.Columns["meal"].HeaderText = "饮食配置";
            dataGridView1.Columns["price"].HeaderText = "单价";
        }

        private void f(object sender, DataGridViewCellEventArgs e)
        {
        }

        private void deleteRow(object sender, EventArgs e)
        {

            int rowindex = dataGridView1.SelectedCells[0].RowIndex;
            string id = dataGridView1.Rows[rowindex].Cells[0].Value.ToString();

            SqlQuery query = new SqlQuery(
                SqlQuery.DELETE,
                "tbl_typeMNG",
                new SqlEntries[] {
                    new SqlEntries("id",id),
                },
                null,null);
            int line = Database.requestDBFromCommand(query.query);
            if (line > 0) {
                notification.Text = "已删除";
            }
        }

    }
}
