<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />
<xsl:template match="/">
    <html>
            <head>

            </head>
        <body>
                <dl>
                    <xsl:for-each select="living-room/table/furnature">
                        <dt><xsl:value-of select="name" /></dt>
                        <dd><xsl:value-of select="brand" /></dd>
                    </xsl:for-each>

                </dl>
        </body>
    </html>
</xsl:template>
</xsl:stylesheet>