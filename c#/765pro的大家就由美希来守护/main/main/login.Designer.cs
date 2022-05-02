namespace main
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Form1));
            this.submit = new System.Windows.Forms.Button();
            this.userInput = new System.Windows.Forms.TextBox();
            this.title = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.usernameInputBox = new System.Windows.Forms.Panel();
            this.notification2 = new System.Windows.Forms.Label();
            this.timer2 = new System.Windows.Forms.Timer(this.components);
            this.passwordInputBox = new System.Windows.Forms.Panel();
            this.button2 = new System.Windows.Forms.Button();
            this.notification = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.pwdInput = new System.Windows.Forms.TextBox();
            this.button1 = new System.Windows.Forms.Button();
            this.usernameInputBox.SuspendLayout();
            this.passwordInputBox.SuspendLayout();
            this.SuspendLayout();
            // 
            // submit
            // 
            this.submit.BackColor = System.Drawing.Color.White;
            this.submit.Location = new System.Drawing.Point(326, 337);
            this.submit.Name = "submit";
            this.submit.Size = new System.Drawing.Size(97, 37);
            this.submit.TabIndex = 0;
            this.submit.Text = "输入密码";
            this.submit.UseVisualStyleBackColor = false;
            this.submit.Click += new System.EventHandler(this.button1_Click);
            // 
            // userInput
            // 
            this.userInput.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.userInput.Font = new System.Drawing.Font("Microsoft YaHei", 16F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            this.userInput.Location = new System.Drawing.Point(149, 204);
            this.userInput.Name = "userInput";
            this.userInput.Size = new System.Drawing.Size(274, 29);
            this.userInput.TabIndex = 1;
            // 
            // title
            // 
            this.title.AutoSize = true;
            this.title.BackColor = System.Drawing.Color.Transparent;
            this.title.Font = new System.Drawing.Font("Microsoft YaHei", 30F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            this.title.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(187)))), ((int)(((byte)(57)))), ((int)(((byte)(209)))));
            this.title.Location = new System.Drawing.Point(236, 78);
            this.title.Name = "title";
            this.title.Size = new System.Drawing.Size(107, 39);
            this.title.TabIndex = 2;
            this.title.Text = "用户名";
            // 
            // label2
            // 
            this.label2.Font = new System.Drawing.Font("Microsoft YaHei", 30F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            this.label2.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(187)))), ((int)(((byte)(57)))), ((int)(((byte)(209)))));
            this.label2.Location = new System.Drawing.Point(35, 78);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(100, 100);
            this.label2.TabIndex = 3;
            this.label2.Visible = false;
            // 
            // label3
            // 
            this.label3.Font = new System.Drawing.Font("Microsoft YaHei", 30F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            this.label3.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(187)))), ((int)(((byte)(57)))), ((int)(((byte)(209)))));
            this.label3.Location = new System.Drawing.Point(158, 49);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(70, 70);
            this.label3.TabIndex = 4;
            this.label3.Visible = false;
            // 
            // usernameInputBox
            // 
            this.usernameInputBox.BackgroundImage = ((System.Drawing.Image)(resources.GetObject("usernameInputBox.BackgroundImage")));
            this.usernameInputBox.Controls.Add(this.notification2);
            this.usernameInputBox.Controls.Add(this.title);
            this.usernameInputBox.Controls.Add(this.label2);
            this.usernameInputBox.Controls.Add(this.label3);
            this.usernameInputBox.Controls.Add(this.userInput);
            this.usernameInputBox.Controls.Add(this.submit);
            this.usernameInputBox.Location = new System.Drawing.Point(2, 1);
            this.usernameInputBox.Name = "usernameInputBox";
            this.usernameInputBox.Size = new System.Drawing.Size(607, 480);
            this.usernameInputBox.TabIndex = 5;
            // 
            // notification2
            // 
            this.notification2.AutoSize = true;
            this.notification2.BackColor = System.Drawing.Color.Transparent;
            this.notification2.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(230)))), ((int)(((byte)(87)))), ((int)(((byte)(255)))));
            this.notification2.Location = new System.Drawing.Point(145, 272);
            this.notification2.Name = "notification2";
            this.notification2.Size = new System.Drawing.Size(0, 20);
            this.notification2.TabIndex = 6;
            // 
            // timer2
            // 
            this.timer2.Interval = 1;
            this.timer2.Tick += new System.EventHandler(this.timer2_Tick);
            // 
            // passwordInputBox
            // 
            this.passwordInputBox.BackgroundImage = ((System.Drawing.Image)(resources.GetObject("passwordInputBox.BackgroundImage")));
            this.passwordInputBox.Controls.Add(this.button2);
            this.passwordInputBox.Controls.Add(this.notification);
            this.passwordInputBox.Controls.Add(this.label4);
            this.passwordInputBox.Controls.Add(this.pwdInput);
            this.passwordInputBox.Controls.Add(this.button1);
            this.passwordInputBox.Location = new System.Drawing.Point(615, 1);
            this.passwordInputBox.Name = "passwordInputBox";
            this.passwordInputBox.Size = new System.Drawing.Size(627, 477);
            this.passwordInputBox.TabIndex = 6;
            // 
            // button2
            // 
            this.button2.BackColor = System.Drawing.Color.White;
            this.button2.Location = new System.Drawing.Point(182, 337);
            this.button2.Name = "button2";
            this.button2.Size = new System.Drawing.Size(97, 37);
            this.button2.TabIndex = 6;
            this.button2.Text = "上一步";
            this.button2.UseVisualStyleBackColor = false;
            this.button2.Click += new System.EventHandler(this.button2_Click);
            // 
            // notification
            // 
            this.notification.AutoSize = true;
            this.notification.BackColor = System.Drawing.Color.Transparent;
            this.notification.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(230)))), ((int)(((byte)(87)))), ((int)(((byte)(255)))));
            this.notification.Location = new System.Drawing.Point(178, 256);
            this.notification.Name = "notification";
            this.notification.Size = new System.Drawing.Size(0, 20);
            this.notification.TabIndex = 5;
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.BackColor = System.Drawing.Color.Transparent;
            this.label4.Font = new System.Drawing.Font("Microsoft YaHei", 30F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            this.label4.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(187)))), ((int)(((byte)(57)))), ((int)(((byte)(209)))));
            this.label4.Location = new System.Drawing.Point(276, 78);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(77, 39);
            this.label4.TabIndex = 2;
            this.label4.Text = "密码";
            // 
            // pwdInput
            // 
            this.pwdInput.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.pwdInput.Font = new System.Drawing.Font("Microsoft YaHei", 16F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            this.pwdInput.Location = new System.Drawing.Point(182, 204);
            this.pwdInput.Name = "pwdInput";
            this.pwdInput.Size = new System.Drawing.Size(274, 29);
            this.pwdInput.TabIndex = 1;
            // 
            // button1
            // 
            this.button1.BackColor = System.Drawing.Color.White;
            this.button1.Location = new System.Drawing.Point(359, 337);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(97, 37);
            this.button1.TabIndex = 0;
            this.button1.Text = "登录";
            this.button1.UseVisualStyleBackColor = false;
            this.button1.Click += new System.EventHandler(this.button1_Click_1);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 20F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.White;
            this.ClientSize = new System.Drawing.Size(609, 481);
            this.Controls.Add(this.passwordInputBox);
            this.Controls.Add(this.usernameInputBox);
            this.Font = new System.Drawing.Font("Microsoft YaHei", 14F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedDialog;
            this.Margin = new System.Windows.Forms.Padding(4, 5, 4, 5);
            this.MaximizeBox = false;
            this.Name = "Form1";
            this.Text = "登录                                                                               " +
    "                                                                      ";
            this.Load += new System.EventHandler(this.Form1_Load);
            this.usernameInputBox.ResumeLayout(false);
            this.usernameInputBox.PerformLayout();
            this.passwordInputBox.ResumeLayout(false);
            this.passwordInputBox.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Button submit;
        private System.Windows.Forms.TextBox userInput;
        private System.Windows.Forms.Label title;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Panel usernameInputBox;
        private System.Windows.Forms.Timer timer2;
        private System.Windows.Forms.Panel passwordInputBox;
        private System.Windows.Forms.Label notification;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.TextBox pwdInput;
        private System.Windows.Forms.Button button1;
        private System.Windows.Forms.Button button2;
        private System.Windows.Forms.Label notification2;
    }
}

