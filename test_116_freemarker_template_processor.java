/**
 * free marker 的 模板工具
 */
public class TemplateUtil {

    /**
     * The Configuration.
     */
    static Configuration configuration;
//    /**
//     * The String writer.
//     */
//    static StringWriter stringWriter;

    // 静态代码块进行初始化
    static {
        configuration = new Configuration(Configuration.getVersion());
    }

    /**
     * Process template string.
     *
     * @param templateValue the template value
     * @param map           the map
     * @return the string
     * @throws IOException       the io exception
     * @throws TemplateException the template exception
     */
    public static String processTemplate (String templateValue, Map<String, Object> map) throws IOException, TemplateException {
        UUID uuid = UUID.randomUUID();
        Template tpl = new Template(uuid.toString(), templateValue, TemplateUtil.configuration);
        StringWriter stringWriter = new StringWriter(); // 不可用作静态变量，因为会
        tpl.process(map, stringWriter);
        return stringWriter.toString();
    }
}
