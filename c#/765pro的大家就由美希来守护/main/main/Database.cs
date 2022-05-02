using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;
using System.Windows.Forms;

namespace main{
    /*
     * 
     * @name: SqlInitError 
     *      
     * @constructor param: string msg
     * 
     * @return: an object with a message property
     * 
     * @discribe: use to discribe the exception during init Database class 
    */
    public class SqlInitError : Exception
    {
        public string message;
        public SqlInitError(string msg)
        {
            this.message = msg;
        }
    }
    /*
     * 
     * @name: requestError 
     * 
     * @constructor param: string msg
     * 
     * @return: an object with a message property
     * 
     * @discribe: use to discribe the exception during config the database and query data
    */
    public class requestError : Exception
    {
        public string message;
        public requestError(string msg)
        {
            this.message = msg;
        }
    }
    /*
     * 
     * @name: SqlEntries 
     * 
     * @constructor param:[ string key ,string value]
     * 
     * @return: an object with key,value property
     * 
     * @discribe: a data element of SqlQuery class, use to define the entries which is used to participate in the query operation
     * consist of a key and a value to specify the data
    */
    public class SqlEntries
    {
        public string key;
        public string value;
        public SqlEntries(string key, string value)
        {
            this.key = key;
            this.value = value;
        }
        public SqlEntries()
        {


        }

    }
    /*
     * 
     * @name: SqlQuery 
     * 
     * @constructor param:short type,[string tableName[SqlEntries constraint,SqlEntries[] constraint]]
     * 
     * @return: an object with query,type property and also some method in use
     * 
     * @discribe: this class have four constants which specify the type of query programing.
     * 
     * PROPERTY:
     *      string query:the init query programming with given information
     *      
     *      short type: the type of query programming
     *      
     * METHOD:  
     *      initQuery(short type,string tableName, SqlEntries constraint,...SqlEntries[] entries)
     *      use to init query programming
     *      
     * CONSTANT:
     *      short INSERT = 1;
     *      create an insert query
     *      
     *      short DELETE = 2;
     *      create an delete query
     *      
     *      short UPDATE = 3;
     *      create an update query
     *      
     *      short SELECT = 4;
     *      create an select query
     *      
    */
    public class SqlQuery
    {
        static public short INSERT = 1;
        static public short DELETE = 2;
        static public short UPDATE = 3;
        static public short SELECT = 4;
        public short type;
        public string query = "";

        public string initQuery(short type, string tableName, SqlEntries[] constraint, SqlEntries ordered, params SqlEntries[] entries)
        {
            string res = "";
            switch (type)
            {
                //INSERT INTO TABLE VALUES();
                case 1:
                    res += "INSERT INTO " + tableName + " VALUES(";
                    for (int i = 0, len = entries.Length; i < len; i++)
                    {
                        res += "'" + entries[i].value + "'";
                        if (i != len - 1) res += ",";
                    }
                    res += ")";
                    break;
                //DELETE FROM TABLE WHERE ID=ID
                case 2:
                    res += "DELETE FROM " + tableName;
                    if (constraint != null) {
                        res += " WHERE";
                        for (int i = 0; i < constraint.Length; i++) {
                            res += " " + constraint[i].key + "='" + constraint[i].value + "'";
                            if (i != constraint.Length - 1) res += " and";

                        }
                    }
                    break;
                //UPDATE TABLE SET KEY=VALUE,KEY=VALUE,KEY=VALUE WHERE ID=ID
                case 3:
                    res += "UPDATE " + tableName + " SET ";
                    for (int i = 0, len = entries.Length; i < len; i++)
                    {
                        res += entries[i].key + "='" + entries[i].value + "'";
                        if (i != len - 1) res += ",";
                    }
                    if (constraint != null) {
                        res += " WHERE";
                        for (int i = 0; i < constraint.Length; i++) {
                            res += " " + constraint[i].key + "='" + constraint[i].value + "'";
                            if (i != constraint.Length - 1) res += " and";

                        }
                    }                    break;
                //SELECT * FROM TABLE WHERE ID=ID ORDER BY DESC
                case 4:
                    //res += "SELECT * FROM " + tableName;
                    res += "SELECT ";
                    if (entries != null){
                        for (int i = 0, len = entries.Length; i < len; i++){
                            res += entries[i].key;
                            if (i != constraint.Length - 1) res += ",";
                        }
                        res += " ";
                    }
                    else {
                        res += "* ";
                    }
                    res += "FROM " + tableName;

                    if (constraint != null) {
                        res += " WHERE";
                        for (int i = 0; i < constraint.Length; i++) {
                            res += " " + constraint[i].key + "='" + constraint[i].value + "'";
                            if (i != constraint.Length - 1) res += " and";

                        }
                    }
                    if (ordered != null) {
                        res += " order by " + ordered.key + " " + ordered.value;
                    }
                    break;
            }
            this.query = res;

            return res;

        }
        public SqlQuery(short type, string tableName, SqlEntries[] constraint, SqlEntries ordered, params SqlEntries[] entries)
        {
            if (type > 4 || type < 1) throw new SqlInitError("SQL Query : the number of query type is out of range");
            this.type = type;
            this.query = this.initQuery(type, tableName, constraint ,ordered, entries);
        }
        public SqlQuery(short type, string tableName)
        {
            if (type > 4 || type < 1) throw new SqlInitError("SQL Query : the number of query type is out of range");
            this.type = type;
            //SqlEntries constraint = null;
            this.query = this.initQuery(type, tableName, null,null, new SqlEntries[] { });
        }
        public SqlQuery(short type)
        {
            if (type > 4 || type < 1) throw new SqlInitError("SQL Query : the number of query type is out of range");
            this.type = type;
        }

    }
    /*
     * 
     * @name: Database 
     * 
     * @constructor param: you neednt call this constructor anywhere
     * 
     * @return: an empty object
     * 
     * @discribe: for static methods used to operate SQL server database
     * 
     * PROPERTY:
     *   static string config
     *      use to config database 
     *      
     * METHOD:  
     *   static string changeDatabase(string database )
     *      an interface of config property
     *      
     *   static DataSet requestDBFromAdapter(string query)
     *      request database with data adapter and return a DataSet Object which fill with return value
     *      
     *      
     *   static int requestDBFromCommand(string query)
     *      request database with  SqlCommand Object and return a number which specify the line was effected 
    */
    public class Database
    {
        static private string config = "data source=.;uid=sa;pwd=mikimiki;database=pro4;";
        static public string changeDatabase(string database)
        {
            Database.config = database;
            return Database.config;
        }
        static public DataSet requestDBFromAdapter(string query)
        {
            SqlConnection connection = null;

            try
            {
                connection = new SqlConnection(Database.config);
                connection.Open();
            }
            catch
            {
                throw new requestError("SQL : Sql connection config string is invalid");
            }

            SqlDataAdapter dataAdapter = null;
            DataSet dataset = null;

            try
            {
                dataAdapter = new SqlDataAdapter(query, connection);
                dataset = new DataSet();
                dataAdapter.Fill(dataset);
            }
            catch
            {
                throw new requestError("SQL : query string is invalid");

            }

            connection.Close();
            return dataset;
        }
        static public int requestDBFromCommand(string query)
        {
            SqlConnection connection = null;

            try
            {
                connection = new SqlConnection(Database.config);
                connection.Open();
            }
            catch
            {
                throw new requestError("SQL : Sql connection config string is invalid");
            }

            SqlCommand command = null;
            int line = 0;
            try
            {
                command = new SqlCommand(query, connection);
                line = command.ExecuteNonQuery();

            }
            catch
            {
                throw new requestError("SQL : query string is invalid");

            }
            connection.Close();
            return line;
        }
    }
}
