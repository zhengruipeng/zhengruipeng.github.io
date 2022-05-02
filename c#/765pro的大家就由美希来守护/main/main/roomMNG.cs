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
    public partial class roomMNG : Form
    {
        public roomMNG()
        {
            InitializeComponent();
        }

        private List<string> roomType = new List<string>();

        private void roomMNG_Load(object sender, EventArgs e)
        {
            SqlQuery query = new SqlQuery(
                SqlQuery.SELECT,
                "tbl_roomMNG",
                null,
                null, null);
            DataSet dataset = Database.requestDBFromAdapter(query.query);
            for (int i = 0, len = dataset.Tables[0].Rows.Count; i < len; i++) {
                if (dataset.Tables[0].Rows[i].ItemArray[4].ToString() == "1")
                {

                    dataset.Tables[0].Rows[i].ItemArray[4] = "已经有人入住";
                }
                else if (dataset.Tables[0].Rows[i].ItemArray[4].ToString() == "0") {
                    dataset.Tables[0].Rows[i].ItemArray[4] = "无人入住";

                }
            }
            dataGridView1.DataSource = dataset.Tables[0];

            dataGridView1.Columns["rno"].HeaderText = "房间编号";
            dataGridView1.Columns["floor"].HeaderText = "楼层";
            dataGridView1.Columns["room"].HeaderText = "第几间";
            dataGridView1.Columns["type"].HeaderText = "房间类型";
            dataGridView1.Columns["livein"].HeaderText = "是否有人入住";
            dataGridView1.Columns["rno"].ReadOnly = true;

            query = new SqlQuery(
                SqlQuery.SELECT,
                "tbl_typeMNG",
                null,
                null, null);
            dataset = Database.requestDBFromAdapter(query.query);


            for (int i = 0, len = dataset.Tables[0].Rows.Count; i < len; i++) {
                roomType.Add(dataset.Tables[0].Rows[i].ItemArray[1].ToString());
                //MessageBox.Show(i.ToString());
            }
        }

        private void saveEdit(object sender, DataGridViewCellEventArgs e)
        {
            string rno = "";
            string floor = "";
            string room = "";
            string type = "";
            string livein = "";
            try
            {
                rno = dataGridView1.Rows[e.RowIndex].Cells[0].Value.ToString();
                floor = dataGridView1.Rows[e.RowIndex].Cells[1].Value.ToString();
                room = dataGridView1.Rows[e.RowIndex].Cells[2].Value.ToString();
                type = dataGridView1.Rows[e.RowIndex].Cells[3].Value.ToString();
                livein = dataGridView1.Rows[e.RowIndex].Cells[4].Value.ToString();
            }
            catch {

            }
            if (rno == "")
            {
                notification.Text = "请指定ID信息";
                dataGridView1.Columns["rno"].ReadOnly = false;
            }
            int typeInArr = 0;
            try
            {
                if (int.Parse(rno) <0 )
                {
                    notification.Text = "房间号不合法";
                    return;
                }
                if (rno.Length > 4) {
                    notification.Text = "房间号长度为3-4位";
                    return;
                }
                if (int.Parse(rno) < 0)
                {
                    notification.Text = "ID不能是负数";
                    return;
                }
            }
            catch {
                notification.Text = "房间号不合法";
                return;
            }


            for (int i = 0, len = roomType.Count; i < len; i++) {
                if (roomType[i] == type) typeInArr = 1;
            }
            if (typeInArr == 0) {
                notification.Text = "您的类型输入有问题，请按照类型数据表中类型进行输入";
                return ;

            }
            if (floor != "" && room != "")
            {
                try
                {
                    if (int.Parse(room) < 10)
                    {
                        if (rno != floor + "0" + room)
                        {
                            notification.Text = "您输入的房间ID和楼层信息不匹配";
                            return;
                        }
                    }
                    else
                    {
                        if (rno != floor + room)
                        {
                            notification.Text = "您输入的房间ID和楼层信息不匹配";
                            return;
                        }
                    }
                }
                catch
                {
                    notification.Text = "您输入的房间ID和楼层信息不匹配";
                    return;
                }
            }
            else {

                if (rno.Length == 3) {
                    room = rno.Substring(1,2);
                    floor = rno.Substring(0, 1);
                    if (room[0] == '0') {
                        room = room[1]+"";
                    }
                }
                if (rno.Length == 4)
                {
                    room = rno.Substring(1,2);
                    floor = rno.Substring(0, 2);
                    if (room[0] == '0')
                    {
                        room = room[1] + "";
                    }
                    if (floor[0] == '0')
                    {
                        floor = floor[1] + "";
                    }
                }
            }

            
            SqlQuery query = new SqlQuery(
                SqlQuery.UPDATE,
                "tbl_roomMNG",
                new SqlEntries[] {
                    new SqlEntries("rno", rno),
                },
                new SqlEntries("rno", "desc"),
                new SqlEntries[] {
                    new SqlEntries("floor", floor),
                    new SqlEntries("room", room),
                    new SqlEntries("type", type),
                    new SqlEntries("livein", livein)
                });
            int line = 0;
            line = Database.requestDBFromCommand(query.query);

            if (line > 0)
            {
                notification.Text = "已自动保存";
            }
            else
            {
                notification.Text = "更改出问题";

                query = new SqlQuery(
                SqlQuery.INSERT,
                "tbl_roomMNG",
                new SqlEntries[] {
                    new SqlEntries("rno", rno),
                },
                new SqlEntries("rno", "desc"),
                new SqlEntries[] {
                    new SqlEntries("rno", rno),
                    new SqlEntries("floor", floor),
                    new SqlEntries("room", room),
                    new SqlEntries("type", type),
                    new SqlEntries("livein", livein)
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
                    dataGridView1.Columns["rno"].ReadOnly = true;


                }
            }
        }

        private void 刷新ToolStripMenuItem_Click(object sender, EventArgs e)
        {
            SqlQuery query = new SqlQuery(
                SqlQuery.SELECT,
                "tbl_roomMNG",
                null,
                null, null);
            DataSet dataset = Database.requestDBFromAdapter(query.query);

            dataGridView1.DataSource = dataset.Tables[0];

            dataGridView1.Columns["rno"].HeaderText = "房间编号";
            dataGridView1.Columns["floor"].HeaderText = "楼层";
            dataGridView1.Columns["room"].HeaderText = "第几间";
            dataGridView1.Columns["type"].HeaderText = "房间类型";
            dataGridView1.Columns["livein"].HeaderText = "是否有人入住";
        }

        private void 删除当前行ToolStripMenuItem_Click(object sender, EventArgs e)
        {
            int rowindex = dataGridView1.SelectedCells[0].RowIndex;
            string id = dataGridView1.Rows[rowindex].Cells[0].Value.ToString();

            SqlQuery query = new SqlQuery(
                SqlQuery.DELETE,
                "tbl_roomMNG",
                new SqlEntries[] {
                    new SqlEntries("rno",id),
                },
                null, null);
            int line = Database.requestDBFromCommand(query.query);
            if (line > 0)
            {
                notification.Text = "已删除";
            }
        }
    }
}
