package terminal;

import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import jakarta.json.JsonStructure;
import jakarta.json.JsonValue;

import java.io.*;
import java.net.*;
import java.time.LocalDateTime;
import java.util.Scanner;

@Component
public class TerminalIntegration {
    private ServerSocket serverSocket = null;
    private String serverIp;

    public TerminalIntegration() {
        // Constructor is now empty
    }

    @PostConstruct
    public void initialize() {
        try {
            InetAddress inetAddress = InetAddress.getByName("169.254.67.209"); // IP Address server
            int port = 3322;
            serverSocket = new ServerSocket(port, 50, inetAddress);
            this.serverIp = inetAddress.getHostAddress();
            System.out.println("Server started on port " + serverSocket.getLocalPort() + "...");
            System.out.println("Server IP address: " + serverIp);
            System.out.println("Waiting for client...");
        } catch (IOException e) {
            System.out.println("Error initializing server socket: " + e.getMessage());
        }
    }

    public void start() {
        if (serverSocket == null) {
            System.out.println("Server socket is not initialized.");
            return;
        }
        while (true) {
            try (Socket socket = serverSocket.accept()) {
                System.out.println("Client " + socket.getRemoteSocketAddress() + " connected to the server...");

                try (BufferedInputStream bis = new BufferedInputStream(socket.getInputStream());
                     DataInputStream dis = new DataInputStream(bis);
                     DataOutputStream dos = new DataOutputStream(socket.getOutputStream());
                     BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()))) {

                    while (true) {
                        clearScreen(dos);
                        dos.writeBytes("Digite a matricula:" + "\r\n");

                        StringBuilder userInput = new StringBuilder();
                        while (true) {
                            int inputChar = in.read();
                            if (inputChar == 13) {  // Check if the user pressed Enter
                                break;
                            }
                            userInput.append((char) inputChar);
                            dos.writeByte(inputChar);
                        }

                        String studentId = userInput.toString();
                        String response = getEvent(studentId);
                        showEvent(response, dos, studentId);

                        while (in.read() != 13) {

                        }
                    }
                } catch (IOException e) {
                    System.out.println(e.getMessage());
                } finally {
                    socket.close();
                    System.out.println("Client " + socket.getRemoteSocketAddress() + " disconnected from the server...");
                }
            } catch (IOException e) {
                System.out.println("Error: " + e.getMessage());
            }
        }
    }

    private String getEvent(String matricula) throws IOException {
        String apiUrl = "http://" + this.serverIp + ":8080/aulas/proxima/" + matricula;
        String charset = "UTF-8";
        String query = String.format("periodoId=%s", URLEncoder.encode(String.valueOf(1), charset));
        URL url = new URL(apiUrl + "?" + query);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();


        int responseCode = conn.getResponseCode();
        if (responseCode == HttpURLConnection.HTTP_OK) {
            Scanner scanner = new Scanner(conn.getInputStream());
            StringBuilder response = new StringBuilder();
            while (scanner.hasNextLine()) {
                response.append(scanner.nextLine());
            }
            scanner.close();
            return response.toString();
        } else if (responseCode == HttpURLConnection.HTTP_ACCEPTED) {
            System.out.println("Error: Matricula Not Found");
            System.out.println("Status: " + responseCode);
            return "Sem registro de aula para hoje";
        } else {
            System.out.println("Error: Request failed");
            System.out.println("Status: " + responseCode);
            return "Matricula nao encontrada";
        }
    }

    private void showEvent(String response, DataOutputStream dos, String matricula) {
        try {
            response = response.replaceAll("\r?\n", "");
            response = response.replaceAll("20c08", "");
            JsonReader reader = Json.createReader(new StringReader(response));
            JsonStructure jsonStructure = reader.read();

            if (jsonStructure.getValueType() == JsonValue.ValueType.OBJECT) {
                JsonObject aulaInfo = jsonStructure.asJsonObject();
                // Extraindo informações do JSON
                String disciplina = aulaInfo.getJsonObject("disciplina").getString("sigla", "N/A");
                String professor = aulaInfo.getJsonObject("professor").getString("nome", "N/A");
                String horaInicio = aulaInfo.getString("horaInicio", "N/A");
                String horaFim = aulaInfo.getString("horaFim", "N/A");
                String diaSemana = aulaInfo.getString("diaDaSemana", "N/A");
                String local = aulaInfo.getJsonObject("local").getString("nomeLocal", "N/A");

                LocalDateTime localDateTime = LocalDateTime.now();
                String turno = "Ola, ";
                System.out.println("Matricula: " + matricula);
                System.out.println("Aula: " + disciplina);
                System.out.println("Local: " + local);

                clearScreen(dos);
                dos.writeBytes(disciplina + "\r\n");
                dos.writeBytes(professor + "\r\n");
                dos.writeBytes(horaInicio + " às " + horaFim + "\r\n");
                dos.writeBytes(local + "\r\n");
            } else {
                clearScreen(dos);
                dos.writeBytes("Ocorreu um erro desconhecido ao ler as informacoes");
                System.out.println("Error: No event found for the given matricula.");
            }
        } catch (Exception e) {
            System.out.println("Error displaying class information: " + e.getMessage());
            try {
                clearScreen(dos);
                // dos.writeBytes("Erro ao exibir as informações da aula.\r\n");
                dos.writeBytes(response);
            } catch (IOException ioException) {
                System.out.println("Error: " + ioException.getMessage());
            }
        }
    }

    private String defineShift(int time) {
        if (time < 12) return "Bom dia";
        if (time < 18) return "Boa tarde";
        return "Boa noite";
    }

    private void clearScreen(DataOutputStream dos) throws IOException {
        dos.writeBytes("\033[H\033[2J");
        dos.flush();
    }

    public static void main(String[] args) {
        TerminalIntegration service = new TerminalIntegration();
        service.initialize();
        service.start();
    }
}