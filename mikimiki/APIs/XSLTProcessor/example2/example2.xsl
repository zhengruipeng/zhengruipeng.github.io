<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns="http://www.w3.org/1999/xhtml"
                xmlns:html="http://www.w3.org/1999/xhtml" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" indent="yes" />

    <xsl:param name="myOrder" />

    <xsl:template match="/">

        <xsl:apply-templates select="/div//div">
            <xsl:sort select="." data-type="number" order="{$myOrder}" />
        </xsl:apply-templates>
    </xsl:template>

    <xsl:template match="div">
        <xsl:copy-of select="." />
    </xsl:template>
</xsl:stylesheet>