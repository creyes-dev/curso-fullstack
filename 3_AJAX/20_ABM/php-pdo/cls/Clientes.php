<?php //require_once('cfg/core.php') ?>
<?php
class Clientes{
	private $db;
	public function __construct(){
		$this->db = new Database();
	}
	public function __destruct() {
		$this->db = null;
	}
	public function mostrar(){
		return $this->db->query("SELECT * from clientes");
	}
	public function guardar($nombre,$apellido,$fecha){
		return $this->db->query("insert into clientes values(null, '$nombre','$apellido','$fecha')");
	}
	public function borrar($id){
		return $this->db->query("DELETE from clientes where id='$id'");
	}
	public function modificar($id,$nombre,$apellido,$fecha){
		return $this->db->query("UPDATE clientes set nombre='$nombre',apellido='$apellido',fecha_nac='$fecha' where id='$id'");	
	}	
}