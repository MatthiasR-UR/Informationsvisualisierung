import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.HashMap;

public class ConverterHash {
	
	static String input = "C:/Users/Matt/Desktop/Webseitenlogs/log-0.txt";
	static String output = "C:/Users/Matt/Desktop/Webseitenlogs/output/log-0.csv";
	static String cols = "userID,type,date,requestType,request,protocol,statusCode,contentLength,referer,agent";
	static HashMap<String, Integer> users = new HashMap<String, Integer>(100000, 0.75f);
	static int userCount = 0;
	
	/**
	 * Formats the string with regular expressions to fit the CSV-Scheme
	 * @param s the String to be formatted
	 * @return The formatted String
	 */
	public static String formatLine(String s){
		//removing all initial commas
		s = s.replace(",", "");
		//remove leading " 
		s = s.replace(" \"", " ");
		// replace ending "
		s = s.replace("\"", ",");

		s = s.replace(" +0200", "");
		s = s.replaceAll("(GET|POST|HEAD|PUT|DELETE|CONNECT|OPTIONS|TRACE)( \\/.*?) ", "$1,$2,");
		
		s = s.replace(" - - ", ",");
		s = s.replace("\"-\"", ",");
		s = s.replace("[", "");
		s = s.replace("] ", ",");

		//Monthname
		s = s.replace("/Apr/", "/04/");
		//comma after number of transmitted bytes
		s = s.replaceAll("\\ (\\d{3} \\d+)", "$1,");
		//handles no bytes transmitted
		s = s.replaceAll("\\ (\\d{3} -)\\ ", "$1,");
		//comma after HTML-Status
		s = s.replaceAll("(\\d{3})\\ ((\\d+?,|-,))", "$1,$2");
		//seperate date-time to fit SQL-Timestamp
		s = s.replaceAll("(\\d{2}/\\d{2}/\\d{4}):", "$1 ");
		s = s.replaceAll("(\\d{2})/(\\d{2})/(\\d{4})", "$3-$2-$1");
		return s;
	}
	
	/**
	 * Looks at the user-hash, exchanges it for an id and determines if external or internal pc 
	 * @param s complete line to be written into the file
	 * @return formatted line
	 */
	public static String getIdAndInternal(String s){
		String [] toWrite = null;
		String currentHash = null;
		String end = ",";
		
		toWrite = s.split(",");
		currentHash = toWrite[0];
		
		//looks if from university or external pc, wifi or vpn
		if(currentHash.contains("clan")) end += "clan";
		else if (currentHash.contains("wifi")) end += "wifi";
		else if (currentHash.contains("vpn")) end += "vpn";
		else end += "external";
		
		//uses "get" instead of "containsKey" because of the performance
		if (users.get(currentHash) == null){ 
			users.put(currentHash, userCount);
			toWrite[0] = Integer.toString(userCount);
			userCount++;
		}
		else{
			toWrite[0] = Integer.toString(users.get(currentHash));
		}
		
		toWrite[0] = toWrite[0] + end;
		s = "";
		for(int i = 0; i < toWrite.length-1; i++){
			s += toWrite[i] + ",";
		}
		s += toWrite[toWrite.length-1];
		
		return s;
	}
	
	public static void main(String[] args){
		BufferedReader br = null;
		BufferedWriter bw = null;
		
		for(int logFile = 1; logFile <= 7; logFile++){
			input = input.replace(Integer.toString(logFile - 1), Integer.toString(logFile));
			output = output.replace(Integer.toString(logFile - 1), Integer.toString(logFile));
			
			try {
				String currentLine;
				int i = 1;
	
				
				br = new BufferedReader(new FileReader(input));
				bw = new BufferedWriter(new FileWriter(output));
				bw.write(cols);
				
				System.out.println("Starting file " + logFile);
				while( (currentLine = br.readLine()) != null){
					i++;
					currentLine = formatLine(currentLine);
					currentLine = getIdAndInternal(currentLine);
					bw.newLine();
					bw.write( currentLine );
					if(i % 100000 == 0){ System.out.println("File " + logFile + " done " + i/100000 +"00k lines.");}
				}
				bw.close();
				System.out.println("Done writing file " + logFile);
			} catch (IOException e){
				e.printStackTrace();
			}
		}
	}
}
